
$(document).ready(function(){
	$("#game-area").on("click", ".card", function(){
		//run an OOP function
		playCards.flip(this);
		console.log(this);

	});
	$("#options").on("click", function() {
		playCards.totalCards(18);
		playCards.shuffleCards();
		playCards.DOM(18);
	});

});


var Cards = function() {
	var self = this;
	var cardImages = ["images/mm_001.jpg", "images/mm_002.jpg", "images/mm_003.jpg", "images/mm_004.jpg", "images/mm_005.jpg",
						 "images/mm_006.jpg", "images/mm_007.jpg", "images/mm_008.jpg", "images/mm_009.jpg"];
	
	self.totalCards = function(level) {
		var concatCount = (level / cardImages.length);
		var allCards = [];
		for (var i=0; i<concatCount; i++) {
			allCards = allCards.concat(cardImages);
		}
		self.totalCards = allCards;
	};
	
	self.shuffleCards = function() {
		var curr_index = self.totalCards.length;
        var temp_value, rand_index;
        while (0 !== curr_index) {
            rand_index = Math.floor(Math.random() * curr_index);
            curr_index -= 1;
            temp_value = self.totalCards[curr_index];
            self.totalCards[curr_index] = self.totalCards[rand_index];
            self.totalCards[rand_index] = temp_value;
        }
	};

	self.DOM = function(level) {
		for (var i=0; i<self.totalCards.length; i++) {
			var cardFront = $("<img>").attr("src", self.totalCards[i]);
			var divFront = $("<div class='front'>").append(cardFront);
			var cardBack = $("<img>").attr("src", "images/mm_back.jpg");
			var divBack = $("<div class='back'>").append(cardBack);
            var divCard = $("<div class='card'>").append(divFront, divBack);
			$("#game-area").append(divCard);
		}
	};

	self.flip = function(cardClicked) {
		var showFront = function() {
        $(cardClicked).find(".back").hide();
		};
		var showBack = function() {
			setTimeout(function() {
        		$(cardClicked).find(".back").show();
		    }, 2000);
		};
		showFront();
		showBack();
	};
	var firstCard = false;
	var secondCard = false;

	self.checkFirstSecond = function(cardClicked) {
		if (firstCard === false && secondCard === false) {
			firstCard = true;
		}
	};

	self.checkMatch = function(card1, card2) {
		var matchFlag = false;
		if (card1 === card2) {
			matchFlag = true;
		} else {
			matchFlag = false;
		}
		return matchFlag;
	};

};

var Stats = function() {
	var self = this;

};

var Board = function() {
	var self = this;
	self.reset = function() {
		//reset stats
		//clear cards, display # cards options
	}

}

var playCards = new Cards();
