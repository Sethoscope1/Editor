ED.Views.CardsListView = Backbone.View.extend({
	
	render: function() {
		var that = this;
		
		// var $cardsHolder = $("#cards-holder")
		
		_(that.collection).each(function (card) {
			that.$el.append(that.renderCard(card));
		});
		return that;
	}, 
	
	renderCard: function(card) {
		var that = this;
		
		var cardSummaryView = new ED.Views.CardSummaryView({
			model: card
		});
		
		that.$el.append(cardSummaryView.render().el)
	}
});
	// el: $("#cards-list"),
	// tagName: "ul",
	
	// initialize: function(cards){
	// 	this.collection = new ED.Collections.Cards();
	// 	this.on("change:searchTerm", this.filterByTerm, this);
	// 	this.collection.on("reset", this.render, this);
	// 	this.render();
	// },
	
	// events: {
	// 	"change #search-terms": "search",
	// },
	
	// render: function(){
	// 	var that = this;
	// 	
	// 	$("#cards-holder").empty();		
	// 	_.each(this.collection.models, function(card) {
	// 		that.renderCard(card);
	// 		console.log(card.title);
	// 	}, this);
	// },
	
	// renderCard: function(card){
	// 	var cardSummaryView = new CardSummaryView({
	// 		model: card
	// 	});
	// 	$("#cards-holder").append(cardSummaryView.render().el);
	// }, 
	// 
	// searchText: function(){
	// 	var words = this.collection.pluck("text").join();
	// 	return _.uniq(words.split(/[ -;:,.?]+/), false, function(word){
	// 		return word.toLowerCase();
	// 	});
	// },
	// 
	// search: function(e){
	// 	console.log("searching...")
	// 	this.searchTerm = e.currentTarget.value;
	// 	this.trigger("change:searchTerm");
	// },
	// 
	// filterByTerm: function(){
	// 	if(this.searchTerm === "") {
	// 		this.collection.reset(cards);
	// 	} else {
	// 		this.collection.reset(cards, { silent: true });
	// 		var searchTerm = this.searchTerm;
	// 		var filtered = _.filter(this.collection.models, function(item){
	// 			var words = item.get("text").split(/[ -:;,.?]+/);
	// 			return _.contains(words, searchTerm);
	// 		});				
	// 		this.collection.reset(filtered);
	// 		console.log(filtered);
	// 		console.log("made it")
	// 	}
	// }

