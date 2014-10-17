App.ApplicationController = Ember.ObjectController.extend ({
	currentUser: Ember.computed.alias('model'),
});


App.RecipesCreateController = Ember.Controller.extend ({
	needs: ['application'],
	// user: Ember.computed.alias('controllers.application.currentUser'),

	actions: { 
		createRecipe: function (){
			var user = this.get('controllers.application.currentUser');
			var newRecipe = this.store.createRecord ('recipe',{
				title: this.get('title'),
				author: user
			});

			newRecipe.save();
			user.get('recipes').addObject(newRecipe);
			user.save();
			this.setProperties({title: ''});
		},
	},
});