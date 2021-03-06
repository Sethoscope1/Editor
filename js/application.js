// Anon function, jQuery aliased as $

(function ($) {
	
	var cards = [
	{ title: "A Battle of Wits",
	summary: "Vizzini and the Man in Black engage in a battle of wits",
	text: "Man in Black: You've made your decision then?\n\nVizzini: Not remotely. Because iocane comes from Australia, as everyone knows, and Australia is entirely peopled with criminals, and criminals are used to having people not trust them, as you are not trusted by me, so I can clearly not choose the wine in front of you.\n\nMan in Black: Truly, you have a dizzying intellect.\n\nVizzini: Wait till I get going! Now, where was I?" },
	
	{ title: "They Meet, Again",
	summary: "Buttercup meets the Dread Pirate Roberts",
	text: "Buttercup: You mock my pain. Man in Black: Life is pain, Highness. Anyone who says differently is selling something." },
	
	{ title: "Revenge",
	summary: "Inigo finally confronts the Six Fingered Man",
	text: "Inigo Montoya: Hello, my name is Inigo Montoya. You killed my father. Prepare to die.\n\n[Rugen attacks again, Inigo parries more fiercely, gaining strength]\n\nInigo Montoya: Hello! My name is Inigo Montoya! You killed my father! Prepare to die!\n\nCount Rugen: Stop saying that!\n\n[Rugen attacks, twice. Inigo avoids and wounds Rugen in both shoulders, the same spots where he wounded Inigo. Inigo attacks, bellowing:]\n\nInigo Montoya: HELLO! MY NAME IS INIGO MONTOYA! YOU KILLED MY FATHER! PREPARE TO DIE!"
	}
	];
	
	var Card = Backbone.Model.extend({
	});
	
	var Cards = Backbone.Collection.extend({
		model: Card
	});
	
	var CardView = Backbone.View.extend({
		tagName: "section",
		className: "card",
		template: $("#cardTemplate").html(),
		
		render: function(){
			var templ = _.template(this.template);
			
			this.$el.html(templ(this.model.toJSON()));
			return this;
		}
	});
	
	var CardSummaryView = Backbone.View.extend({
		tagName: "li",
		className: "card-summary",
		template: $("#cardSummaryTemplate").html(),
		
		events: {
			"click h3": "updateText"
		},
		
		render: function(){
			var templ = _.template(this.template);
			this.$el.html(templ(this.model.toJSON()));
			return this;
		},
		
		updateText: function(){
			console.log("UPDATING TEXT");
			console.log(editView.model);
			editView.model = this.model;
			console.log(editView.model);
			editView.render();
		}
	})
	
	var CardEditView = Backbone.View.extend({
		el: $("#card-edit"),
		
		events: {
			"click #save": "save",
			"click #bold": "bold",
			"click #italics": "italics",
			"change #font-size": "fontSize",
			"change #font-style": "fontStyle"
		},
		
		initialize: function(){
			this.model = new Card(currentCard);
			this.model.on('change', this.render, this);
			this.render();
		},
		
		render: function(){
			this.$el.empty();
			var cardEditView = new CardView({ model: this.model });
			this.$el.append(cardEditView.render().el);
			$("#cardRichText").contents().prop('designMode', 'on');
			var content = $("#text").text();
			console.log(content);
			window.cardRichText.document.body.style.fontFamily = "Adobe Garamond Pro, Georgia, serif";
			window.cardRichText.document.body.style.lineHeight = 1.5;
			window.cardRichText.document.getElementsByTagName("body")[0].innerHTML = content;
		},
		save: function(event) {
			event.preventDefault();
			console.log("SAVING");
			var content = window.cardRichText.document.getElementsByTagName("body")[0].innerHTML;
			$("#text").html(content);
			console.log(content);
			// WRITE AJAX REQUEST ONCE RAILS SIDE UP
			
			currentCard["text"] = content;
			console.log(currentCard["text"]);
		}, 
		
		bold: function() {
			cardRichText.document.execCommand('bold', false, null);
		},
		
		italics: function() {
			cardRichText.document.execCommand('italic', false, null);
		}, 
		
		fontSize: function() {
			var size = $("#font-size").val();
			cardRichText.document.execCommand('fontSize', false, size);
		},
		
		fontStyle: function() {
			var style = $("#font-style").val();
			cardRichText.document.execCommand('fontName', false, style);
			window.cardRichText.document.body.style.fontFamily = style;
		},

	});
	
	var CardsListView = Backbone.View.extend({
		el: $("#cards-list"),
		tagName: "ul",
		
		initialize: function(){
			this.collection = new Cards(cards);
			this.on("change:searchTerm", this.filterByTerm, this);
			this.collection.on("reset", this.render, this);
			this.render();
		},
		
		events: {
			"change #search-terms": "search",
		},
		
		render: function(){
			var that = this;
			$("#cards-holder").empty();		
			_.each(this.collection.models, function(card) {
				that.renderCard(card);
			}, this);
		},
		
		renderCard: function(card){
			var cardSummaryView = new CardSummaryView({
				model: card
			});
			$("#cards-holder").append(cardSummaryView.render().el);
		}, 
		
		searchText: function(){
			var words = this.collection.pluck("text").join();
			return _.uniq(words.split(/[ -;:,.?]+/), false, function(word){
				return word.toLowerCase();
			});
		},
		
		search: function(e){
			console.log("searching...")
			this.searchTerm = e.currentTarget.value;
			this.trigger("change:searchTerm");
		},
		
		filterByTerm: function(){
			if(this.searchTerm === "") {
				this.collection.reset(cards);
			} else {
				this.collection.reset(cards, { silent: true });
				var searchTerm = this.searchTerm;
				var filtered = _.filter(this.collection.models, function(item){
					var words = item.get("text").split(/[ -:;,.?]+/);
					return _.contains(words, searchTerm);
				});				
				this.collection.reset(filtered);
				console.log(filtered);
				console.log("made it")
			}
		}
	});
	
	var currentCard = cards[0];
	var cardsView = new CardsListView();
	var editView = new CardEditView();
	
	
	
} (jQuery));