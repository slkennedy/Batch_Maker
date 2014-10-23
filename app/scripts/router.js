App.Router.map (function(){

	this.route('user' /*,{path:':user_name'}*/);

	this.resource('recipes', function(){
		this.route('create');
	 	this.route('detail'/*,{path: ':recipe_id'}*/);
	});

	this.route('login', {path:''});
	this.route('signup');

});

// App.ApplicationRoute = Ember.Route.extend({
// 	model: function() {
// 		return this.store.find('user', 'simplelogin:11');
// 	}
// });

App.LoginRoute = Ember.Route.extend ({
	model: function (){
		return this.store.find('user');
	}
});

App.UserRoute = Ember.Route.extend ({
	model: function (){
		return this.store.find('recipe');
	}
});

App.RecipesDetailRoute = Ember.Route.extend ({
	model: function (){
		return this.store.find('recipe');
	}
});

App.RecipesCreateRoute = Ember.Route.extend ({
	model: function () {
		return this.store.find('recipe');
	}
});