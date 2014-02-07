ED.Views.CardSummaryView = Backbone.View.extend({
	tagName: "li",
	className: "card-summary",
	
	render: function() {
		var that = this;
		var renderedContent = JST["cards/card_summary"]({
			card: that.model
		})
		that.$el.html(renderedContent);
		return that
	},
	
	updateText: function(){
		console.log("UPDATING TEXT");
		console.log(editView.model);
		editView.model = this.model;
		console.log(editView.model);
		editView.render();
	}
});