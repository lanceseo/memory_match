var aGame = null;
$(document).ready(function(){
	// $("#game-area").on("click", ".card", function(){
	// 	aGame.cardClick(this);
	// });
	// $("#options").on("click", ".btn", function() {
	// });
	aGame = new GameTemplate($("#game-area"));
	aGame.populateImages(18);
	aGame.shuffleImages();
	aGame.createCards(18);
});


var GameTemplate = function(mainElement) {
	var self = this;
	var frontImages = ["images/mm_001.jpg", "images/mm_002.jpg", "images/mm_003.jpg", "images/mm_004.jpg", "images/mm_005.jpg",
				"images/mm_006.jpg", "images/mm_007.jpg", "images/mm_008.jpg", "images/mm_009.jpg"];
	//var backImage = "images/mm_back.jpg";
	var backImage = "";
	var totalImages = null;
	this.element = mainElement;
	this.cardArray = [];
	this.flippedArray = [];
	this.flipCounter = 0;
	this.matchCounter = 0;
	this.aMatch = false;

	this.populateImages = function(numCards) {
		var concatCount = (numCards / frontImages.length);
		var tempImages = [];
		for (var i=0; i<concatCount; i++) {
			tempImages = tempImages.concat(frontImages);
		}
		totalImages = tempImages;
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
			var card = new CardTemplate(this);
			var cardElement = card.createSelf(totalImages[i], backImage);
			self.cardArray.push(card);
			self.element.append(cardElement);
		}
	};
	this.cardClicked = function(currentCard) {
		console.log("theCard: ", currentCard);
		console.log("flipArray", this.flippedArray.length);
		var theCard = currentCard;
		if (self.flippedArray.length < 2) {
			self.flippedArray.push(theCard);
			self.flipCounter++;
			console.log("flipCounter ", self.flipCounter);
		}
		if (self.flippedArray.length === 2) {
			self.checkMatch();
			self.checkWin();
		}
	};
	this.checkMatch = function() {
		var cardImg1 = $(self.flippedArray[0]).find(".front img").attr("src");
		var cardImg2 = $(self.flippedArray[1]).find(".front img").attr("src");
		if (cardImg1 === cardImg2) {
			self.matchCounter++;
			console.log("matchCounter: ", self.matchCounter);
			self.flippedArray = [];
			self.flipCounter = 0;
			console.log("a match");
			return;
		}
		//self.flippedArray = [];
		console.log("no match");
	};
	this.checkWin = function() {

	};
	this.resetCards = function() {

	};
};


var CardTemplate = function(parent) {
	self = this;
	this.element = null;
	this.parent = parent;

	this.createSelf = function(frontImg, backImg) {
		var cardFront = $("<img>").attr("src", frontImg);
		var divFront = $("<div class='front'>").append(cardFront);
		var cardBack = $("<img>").attr("src", backImg);
		var divBack = $("<div class='back'>").append(cardBack);
	    var divCard = $("<div class='card'>").append(divFront, divBack);
    	self.element = divCard.click(this.cardClick);
    	return self.element;
	};
	this.cardClick = function() {
	    if ($(this).hasClass('selected') || self.parent.flippedArray.length >= 2){
	    	console.log("illegal!");
	      	return;
	    }
	    $(this).addClass('selected');
	    //flip here
	    self.parent.cardClicked(this);
	    console.log("flipCounter ", self.parent.flipCounter);
	    if (self.parent.flipCounter === 2) {
	    	//remove 'selected', flip back
	    	console.log("flipping back");
	    	$(self.parent.flippedArray[0]).removeClass('selected');
	    	$(self.parent.flippedArray[1]).removeClass('selected');
	    	self.parent.flippedArray = [];
	    	self.parent.flipCounter = 0;
	    }
	};

};

/*how to attach images, when to append to HTML output DOM, 
card clicking function - check selected, check 2 cards flipped already(use parent counter)
 -error at 4th card -> resolved by resetting flipCounter
 -flip and delay
 -flip back moves, reset counter
 -what to do with cards array?

how to check match, how to check win*/


// Do more OOP lessons, videos, guides