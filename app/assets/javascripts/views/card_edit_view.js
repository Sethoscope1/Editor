ED.Views.CardEditView = Backbone.View.extend({
	
	initialize: function() {
		// this.model = new ED.Models.Card(card);
// 		this.model.on('change', this.render, this);
		this.render();
	},
	
	render: function() {
		var that = this;
		that.$el.empty();
		var cardEditView = new ED.Views.CardView({
			model: that.model
		});
		that.$el.html(cardEditView.render().el);
		
		var content = that.model.text;

		// console.log("CONTENT:")
		// console.log(content);
	

		// clean this up - LOADING IFRAME
		$("#cardRichText").contents().prop('designMode', 'on');

		return that;
	
	},
	
	startIframe: function() {
		console.log("NOW OUTSIDE");
		var content = $("#text").val();
		console.log("CONTENT:");
		console.log(content);
		
		window.cardRichText.document.body.style.fontFamily = "Adobe Garamond Pro, Georgia, serif";
		window.cardRichText.document.body.style.lineHeight = 1.5;
		window.cardRichText.document.getElementsByTagName("body")[0].innerHTML = content;
	
		
	
	},
	

});