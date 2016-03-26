
$(document).ready(function(){
	$("#game-area").on("click", ".card", function(){
		//run an OOP function

	});
	$("#options").on("click", function() {
		playCards.shuffleCards(18);
		playCards.DOM(18);
	});

});


var Cards = function() {
	var self = this;
	var cardImages = ["images/mm_001.jpg", "images/mm_002.jpg", "images/mm_003.jpg", "images/mm_004.jpg", "images/mm_005.jpg",
						 "images/mm_006.jpg", "images/mm_007.jpg", "images/mm_008.jpg", "images/mm_009.jpg"];
	var totalCards = [];
	
	self.shuffleCards = function(level) {
		var concatCount = (level / cardImages.length);
		for (var i=0; i<concatCount; i++) {
			totalCards = totalCards.concat(cardImages);
		}

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
			$("#game-area").append(cardFront);
		}
	};
};

var Stats = function() {
	var self = this;

};


var playCards = new Cards();
