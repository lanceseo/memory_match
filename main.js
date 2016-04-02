
$(document).ready(function(){
	$("#game-area").on("click", ".card", function(){
		aGame.cardClick(this);
	});
	$("#options").on("click", ".btn", function() {
		var option = $(this).attr("id");
		console.log("type: " + typeof option);
		aGame.optionClick(option);
	});
});


var GameController = function() {
	var frontImgs = ["images/mm_001.jpg", "images/mm_002.jpg", "images/mm_003.jpg", "images/mm_004.jpg", "images/mm_005.jpg",
				"images/mm_006.jpg", "images/mm_007.jpg", "images/mm_008.jpg", "images/mm_009.jpg"];
	var backImg = "images/mm_back.jpg";

	this.cardClick = function(theCard) {

	}
	this.optionClick = function(option){
		if (isNum(option)) {
			this.createCards(option);
		} else {
			this.resetCards();
		}
	}
	this.createCards = function(option) {
		for (var i=0; i<frontImgs.length; i++) {

		}
	}
	this.resetCards = function() {

	}
};

var Cards = function() {


};

var Card = function(frontImg, backImg) {
	this.imgName = frontImg;
	this.backFace = true;
	this.createDOM = function() {
		var cardFront = $("<img>").attr("src", frontImg);
		var divFront = $("<div class='front'>").append(cardFront);
		var cardBack = $("<img>").attr("src", backImg);
		var divBack = $("<div class='back'>").append(cardBack);
	    var divCard = $("<div class='card'>").append(divFront, divBack);
		$("#game-area").append(divCard);
	}
};

var aGame = new GameController();
//var aCard = new Card();