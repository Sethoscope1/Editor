window.ED = {
	
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	
	initialize: function($rootEl, cards) {
		// console.log(cards[0]);
		var cardsListView = new ED.Views.CardsListView({
			collection: cards
		});
		
		var cardEditView = new ED.Views.CardEditView({
			model: cards[0]
		})
		
		
		$("#cards-holder").html(cardsListView.render().el);
		$("#card-edit").html(cardEditView.render().el);
		
		cardEditView.startIframe();

		
		// var currentCard = cards[0];
		// var cardsView = new ED.Views.CardsListView();
		// var editView = new ED.Views.CardEditView(currentCard);

	}
	
};