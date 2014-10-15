App.Router.map (function(){
	this.route('user' /*,{path:':user_name'}*/);

	//make a user template
	//make UserRoute
	//hook model to UserRoute

	this.resource('recipes', function(){
		this.route('create');
	// 	this.route('show', {path: ':recipe_id'});
	// 	this.route('edit', {path: ':recipe_id/edit'});
	});

	// this.route('login');
	// this.route('signup');

	this.route('settings');
	// this.route('pantry');
});

App.UserRoute = Ember.Route.extend ({
	model: function (){
		return {username: 'Sara K'};
	}
});