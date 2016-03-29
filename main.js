
$(document).ready(function(){
	$("#game-area").on("click", ".card", function(){
		//run an OOP function
		playCards.flip(this);

	});
	$("#options").on("click", function() {
		playCards.getTotalCards(18);
		playCards.shuffleCards();
		playCards.DOM(18);
	});

});


var Cards = function() {
	var self = this;
	var frontImages = ["images/mm_001.jpg", "images/mm_002.jpg", "images/mm_003.jpg", "images/mm_004.jpg", "images/mm_005.jpg",
						 "images/mm_006.jpg", "images/mm_007.jpg", "images/mm_008.jpg", "images/mm_009.jpg"];
	var backImage = "images/mm_back.jpg";
	var totalCards = [];
	
	self.getTotalCards = function(level) {
		var concatCount = (level / frontImages.length);
		var allCards = [];
		for (var i=0; i<concatCount; i++) {
			allCards = allCards.concat(frontImages);
		}
		totalCards = allCards;
	};
	
	self.shuffleCards = function() {
		var curr_index = totalCards.length;
        var temp_value, rand_index;
        while (0 !== curr_index) {
            rand_index = Math.floor(Math.random() * curr_index);
            curr_index -= 1;
            temp_value = totalCards[curr_index];
            totalCards[curr_index] = totalCards[rand_index];
            totalCards[rand_index] = temp_value;
        }
	};

	self.DOM = function(level) {
		for (var i=0; i<totalCards.length; i++) {
			var cardFront = $("<img>").attr("src", totalCards[i]);
			var divFront = $("<div class='front'>").append(cardFront);
			var cardBack = $("<img>").attr("src", backImage);
			var divBack = $("<div class='back'>").append(cardBack);
            var divCard = $("<div class='card'>").append(divFront, divBack);
			$("#game-area").append(divCard);
		}
	};

	self.matchFlag = false;
	self.matchCounter = 0;
	var flippedCards = [];

	self.flip = function(cardClicked) {
		var cardImg1, cardImg2 = null;
		if ($(cardClicked).find(".back").is(':visible')) {
	        $(cardClicked).find(".back").hide();
	        flippedCards.push(cardClicked);	        	        
		}
		if (flippedCards.length === 2) {
			cardImg1 = $(flippedCards[0]).find(".front img").attr("src");
			cardImg2 = $(flippedCards[1]).find(".front img").attr("src");
			if (cardImg1 === cardImg2) {
				//matchFlag = true;
				self.matchCounter += 1;
				flippedCards = [];
				console.log(self.matchCounter);
			} else {
				$(flippedCards[0]).find(".back").show();
				$(flippedCards[1]).find(".back").show();
				flippedCards = [];
			}
		}        
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
