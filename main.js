var aGame = null;
// sessionStorage for storing total # of games played
var gameSession = sessionStorage;
$(document).ready(function(){
	$("#options").on("click", ".cards", function() {
		// Clicked button's id determines the game level (number of cards to play)
		var numCards = $(this).attr("id");
		aGame = new GameTemplate($("#game-area"));
		aGame.populateImages(numCards);
		aGame.createCards(numCards);
		$(".cards").addClass('animated fadeOut');
	});
	$("#options").on("click", "#reset", function() {
		if (aGame) {
			aGame.resetClicked();
			delete aGame;
			$(".cards").show();
		} else {
			console.log("Game not started. Nothing to reset");
		}
	});
});

var GameTemplate = function(mainElement) {
	var self = this;
	var frontImages = ["images/mm_001.jpg", "images/mm_002.jpg", "images/mm_003.jpg", "images/mm_004.jpg", "images/mm_005.jpg",
				"images/mm_006.jpg", "images/mm_007.jpg", "images/mm_008.jpg", "images/mm_009.jpg"];
	var backImage = "images/mm_back.png";
	//var backImage = "";
	var totalImages = null;
	this.element = mainElement;
	//this.cardArray = [];
	this.flippedArray = [];
	this.flipCounter = 0;
	this.matchCounter = 0;
	this.aStat = null;

	// Populate an equal number of images as the number of all cards from base 9 images
	this.populateImages = function(numCards) {
		var concatCount = (numCards / frontImages.length);
		var tempImages = [];
		for (var i=0; i<concatCount; i++) {
			tempImages = tempImages.concat(frontImages);
		}
		totalImages = tempImages;
		self.shuffleImages();
	};
	this.shuffleImages = function() {
		var curr_index = totalImages.length;
        var temp_value, rand_index;
        while (0 !== curr_index) {
            rand_index = Math.floor(Math.random() * curr_index);
            curr_index -= 1;
            temp_value = totalImages[curr_index];
            totalImages[curr_index] = totalImages[rand_index];
            totalImages[rand_index] = temp_value;
        }
	};
	this.createCards = function(numCards) {
		for (var i=0; i<numCards; i++) {
			// Create Card objects equal to numCards
			var card = new CardTemplate(this);
			var cardElement = card.createSelf(totalImages[i], backImage);
			//self.cardArray.push(card); ===========
			// Append to the game-area DOM
			self.element.append(cardElement);
		}
		self.initializeStats();
	};
	this.cardClicked = function(currentCard) {
		var theCard = currentCard;
		if (self.flippedArray.length < 2) {
			self.flippedArray.push(theCard);
			self.flipCounter++;
		}
		if (self.flippedArray.length === 2) {
			self.aStat.setAttempts();
			self.checkMatch();
			self.checkWin();
		}
		self.aStat.setAccuracy(self.matchCounter);
	};
	this.checkMatch = function() {
		// Check matches by comparing front face images
		var cardImg1 = $(self.flippedArray[0]).find(".front img").attr("src");
		var cardImg2 = $(self.flippedArray[1]).find(".front img").attr("src");
		if (cardImg1 === cardImg2) {
			$(self.flippedArray[0]).removeClass('animated flipInY');
			$(self.flippedArray[1]).removeClass('animated flipInY');
			$(self.flippedArray[0]).addClass('animated flash');
			$(self.flippedArray[1]).addClass('animated flash');
			self.matchCounter++;
			self.flippedArray = [];
			self.flipCounter = 0;
			return;
		}
		console.log("no match");
	};
	this.checkWin = function() {
		var winningMatches = totalImages.length / 2;
		if (self.matchCounter === winningMatches) {
			$("#game-area>div").addClass('animated bounceOut')
			console.log("You win!");
		}
	};
	this.initializeStats = function() {
		self.aStat = new StatsTemplate(); 
		self.aStat.setGamesPlayed();
	};
	this.resetClicked = function() {
		self.aStat.clearStats();
		$("#game-area").empty();
		$(".cards").removeClass("animated fadeOut");
		$(".cards").addClass("animated fadeIn");
	};
};

var CardTemplate = function(parent) {
	self = this;
	this.element = null;
	this.parent = parent;

	this.createSelf = function(frontImg, backImg) {
		// Create card DOM element, attach click handler
		var cardFront = $("<img>").attr("src", frontImg);
		var divFront = $("<div class='front'>").append(cardFront);
		var cardBack = $("<img>").attr("src", backImg);
		var divBack = $("<div class='back'>").append(cardBack);
	    var divCard = $("<div class='card'>").append(divFront, divBack);
    	self.element = divCard.click(this.cardClick);
    	return self.element;
	};
	this.cardClick = function() {
		// Check if clicked card is selected already or 2 cards are already flipped
	    if ($(this).hasClass('selected') || self.parent.flippedArray.length >= 2){
	    	$(this).addClass('animated shake');
	    	console.log("illegal!");
	      	return;      		
	    }
	    // Flip clicked card
	   	$(this).find(".back").hide();
	    $(this).addClass('selected animated flipInY');

	    self.parent.cardClicked(this);

	    if (self.parent.flipCounter === 2) {
	    	// Flip back non-matching cards
	    	setTimeout(function() {
	    		console.log("flipping back");
		    	$(self.parent.flippedArray[0]).find(".back").show();
		    	$(self.parent.flippedArray[1]).find(".back").show();
		    	$(self.parent.flippedArray[0]).removeClass('selected animated flipInY');
		    	$(self.parent.flippedArray[1]).removeClass('selected animated flipInY');
		    	self.parent.flippedArray = [];
		    	self.parent.flipCounter = 0;		    	
        	}, 1500);
	    }	    
	};
};

var StatsTemplate = function() {
	var self = this;
	this.attempts = 0;
	this.accuracy = 0;

	this.setGamesPlayed = function() {
        if (gameSession.getItem('totalGames')) {
        	var tempGames = gameSession.getItem('totalGames');
        	tempGames++;
        	gameSession.setItem('totalGames', tempGames);
        	$("#games-played span").text(tempGames);
        } else {
        	var tempGames = 0;
        	tempGames++;
        	gameSession.setItem('totalGames', tempGames);
        	$("#games-played span").text(tempGames);
        }
	};
	this.setAttempts = function() {
		self.attempts++;
        $("#attempts span").text(self.attempts);
	};
	this.setAccuracy = function(matchCounter) {
        self.accuracy = Math.floor((matchCounter / self.attempts) * 100);
        if (isNaN(self.accuracy)) {
            $("#accuracy span").text("");
        }
        else {
            $("#accuracy span").text(self.accuracy);
        }
	};
	this.clearStats = function() {
		$("#games-played span").text("");
		$("#attempts span").text("");
		$("#accuracy span").text("");
		this.attempts = 0;
		this.accuracy = 0;
		gameSession.removeItem('totalGames');
	};
};

/*
> All functionalities first
how to attach images, when to append to HTML output DOM, 
card clicking function - check selected, check 2 cards flipped already(use parent counter)
 -error at 4th card -> resolved by resetting flipCounter
 -match counting, win condition
 -total # of cards determined (level selector)
 -stats
 -reset counter (how to keep #gamesPlayed? > use sessionStorage)
 -flip and delay, flip back moves
 -hide card selection option upon click

X--- v3 (graphics, animation, layout)
 -change font
 -adjust option selection, stats displays, cards layout (rows)
 -change card backface
 -change button colors 
 -enhance stats displaying?
 -flip/rotate animation
 -win css/animation/graphic notification

 -add, revise comments
 -what to do with cards array?

X--- v4 (extra features)
 -# of matches in Stats
 -change tooltips color or bootstrap confirmation for RESET
 -advanced game features for Settings(from LF points sheet)

*/


