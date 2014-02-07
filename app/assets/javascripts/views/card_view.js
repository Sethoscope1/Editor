ED.Views.CardView = Backbone.View.extend({
	tagName: "section",
	className: "card",
	
	render: function(){
		var that = this;
		// console.log(that.model.title)
		var renderedContent = JST["cards/card"]({
			card: that.model
		})
		that.$el.html(renderedContent);
		return that;
	}

});