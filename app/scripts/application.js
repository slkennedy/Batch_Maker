window.App = Ember.Application.create();

App.ref = new Firebase('https://batchmade.firebaseio.com/');

App.ApplicationAdapter = DS.FirebaseAdapter.extend ({
	firebase: App.ref
});

App.User = DS.Model.extend ({
	email: DS.attr('string'),
	recipes: DS.hasMany('recipe'),
	password: DS.attr('string')
});

App.Recipe = DS.Model.extend ({
	title: DS.attr('string'),
	author: DS.belongsTo('user'),
	type: DS.attr('string'),
	prepTime: DS.attr('number'),
	cookTime: DS.attr('number'),
	cookTemp: DS.attr('number'),
	tempType: DS.attr('string'),
	yieldAmount: DS.attr ('number'),
	yieldType: DS.attr('string'),
	measurement: DS.attr('number'),
	measurementType: DS.attr('string'),
	personalNote: DS.attr('string')
});

App.Ingredient = DS.Model.extend ({
	amount: DS.attr('number'),
	measurement: DS.attr('string'),
	item: DS.attr('string')
});

// 	var newUser = this.store.createUser ('user', {
// 		username: 'SaraK',
// 		firstName: 'Sara',
// 		lastName: 'Kennedy',
// 		recipes: {
// 			recipe_id_1:true
// 		},
// 		password: 'password',
// 		userId: 1
// 	});
// 	newUser.save();

// var newRecipe = this.store.createRecipe ('recipe', {
// 		image: 'http://lorempixel.com/output/food-q-c-150-150-8.jpg',
// 		title: 'California Roll',
// 		recipeId: 1,
// 		author: 'SaraK',
// 		type: 'Dinner',
// 		prepTime: 15,
// 		cookTime: 25,
// 		cookTemp: 0,
// 		ingredients: {
// 			ingredient_id_1:true,
// 			ingredient_id_2:true
// 		},
// 		personalNote: 'I really like using the Awesome Knife to cut my sushi. It works great'
// });
// newRecipe.save();

