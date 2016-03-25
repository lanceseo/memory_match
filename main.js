
$(document).ready(function(){
	$("#game-area").on("click", ".card", function(){
		//run an OOP function

	});
	$("#options").on("click", function() {
		playCards.DOM();
	});

});


var Cards = function() {
	var self = this;
	var cardImages = ["images/ff_Ballade.jpg","images/ff_CutMan.jpg","images/ff_Enker.jpg","images/ff_GutsMan.jpg",
    "images/ff_Punk.jpg","images/ff_QuickMan.jpg","images/ff_Quint.jpg","images/ff_Shadowman.jpg","images/ff_Skullman.jpg"];
	
	self.shuffleCards = function() {

	};

	self.DOM = function() {
		for (var i=0; i<cardImages.length; i++) {
			var cardFront = $("<img>").attr("src", cardImages[i]);
			$("#game-area").append(cardFront);
		}
	};
};


var playCards = new Cards();
