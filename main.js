
var aGame = null;
$(document).ready(function(){
	// $("#game-area").on("click", ".card", function(){
	// 	aGame.cardClick(this);
	// });
	// $("#options").on("click", ".btn", function() {
	// });
	aGame = new GameTemplate($("#game-area"));
	aGame.getTotalCards(18);
	aGame.createCards();
});


var GameTemplate = function(mainElement) {
	var self = this;
	var frontImgs = ["images/mm_001.jpg", "images/mm_002.jpg", "images/mm_003.jpg", "images/mm_004.jpg", "images/mm_005.jpg",
				"images/mm_006.jpg", "images/mm_007.jpg", "images/mm_008.jpg", "images/mm_009.jpg"];
	var backImg = "images/mm_back.jpg";
	
	this.element = mainElement;
	this.cardArray = [];
	var totalCards = null;

	this.totalImages = function(numCards) {
		var concatCount = (numCards / frontImages.length);
		var allCards = [];
		for (var i=0; i<concatCount; i++) {
			allCards = allCards.concat(frontImages);
		}
		totalCards = allCards;
	};
	this.shuffleImages = function() {

	}

	this.createCards = function(numCards) {
		for (var i=0; i<=numCards; i++) {
			var card = new CardTemplate();
			var cardElement = card.createSelf();
			this.cardArray.push(card);
			this.element.append(cardElement);
		}
	}

	this.cardClick = function(theCard) {

	}
	this.optionClick = function(option){
		if (isNum(option)) {
			this.createCards(option);
		} else {
			this.resetCards();
		}
	}
	this.resetCards = function() {

	}
};

var CardTemplate = function() {
	this.element = null;

	// this.createSelf = function() {
	// 	var cardFront = $("<img>").attr("src", frontImg);
	// 	var divFront = $("<div class='front'>").append(cardFront);
	// 	var cardBack = $("<img>").attr("src", backImg);
	// 	var divBack = $("<div class='back'>").append(cardBack);
	//     var divCard = $("<div class='card'>").append(divFront, divBack);
	// 	$("#game-area").append(divCard);
	// }

//how to attach images, when to append to HTML output DOM, how to check match, how to check win
	this.createSelf = function(frontImg, backImg) {
		var cardFront = $("<img>").attr("src", frontImg);
		var divFront = $("<div class='front'>").append(cardFront);
		var cardBack = $("<img>").attr("src", backImg);
		var divBack = $("<div class='back'>").append(cardBack);
	    var divCard = $("<div class='card'>").append(divFront, divBack);
    	this.element = divCard.click(this.cardClick);
    	return this.element;
	}
	this.cardClick = function() {

	}


};

var aGame = new GameController();
//var aCard = new Card();