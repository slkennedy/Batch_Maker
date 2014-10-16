App.Router.map (function(){
	this.route('user' /*,{path:':user_name'}*/);

	//make a user template
	//make UserRoute
	//hook model to UserRoute

	this.resource('recipes', function(){
		this.route('create');
	 	this.route('detail'/*,{path: ':recipe_id'}*/);
	// 	this.route('edit', {path: ':recipe_id/edit'});
	});

	this.route('login');
	this.route('signup');

	this.route('settings');
	// this.route('pantry');
});

App.UserRoute = Ember.Route.extend ({
	model: function (){
		return {username: 'Sara K'};
	}
});

App.RecipesDetailRoute = Ember.Route.extend ({
	model: function (){
		return {
			title: 'Recipe Title',
			id:1,
			author: 'Some Person',
			image: 'http://lorempixel.com/output/food-q-c-800-300-9.jpg',
			type: 'Dessert',
			prepTime: 15,
			cookTime: 20,
			cookTemp: 350
		};
	}
});