window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FirebaseAdapter.extend ({
	firebase: new Firebase ('https://batchmade.firebaseio.com/')
});


	App.User = DS.Model.extend ({
		username: DS.attr('string'),
		firstName: DS.attr('string'),
		lastName: DS.attr('string'),
		recipes: DS.hasMany('recipe')
	});

	App.Recipe = DS.Model.extend ({
		image: DS.attr('string'),
		//comeback to the URL thing that Jess was telling you about
		title: DS.attr('string'),
		id: DS.attr('number'),
		author: DS.attr('string'),
		type: DS.attr('string'),
		prepTime: DS.attr('number'),
		cookTime: DS.attr('number'),
		cookTemp: DS.attr('number'),
		ingredients: DS.hasMany('ingredient'),
		personalNote: DS.attr('string')
	});

	App.Ingredient = DS.Model.extend ({
		amount: DS.attr('number'),
		measurement: DS.attr('string'),
		item: DS.attr('string')
	});


