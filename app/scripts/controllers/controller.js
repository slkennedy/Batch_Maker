App.ApplicationController = Ember.ObjectController.extend ({
	currentUser: Ember.computed.alias('model'),
});


App.RecipesCreateController = Ember.Controller.extend ({
	needs: ['application'],
	tempType: ['°F','°C'],
	recipeType: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Anytime'],
	measurementType: ['Cups','Grams','Tablespoons','Ounces'],

	actions: { 
		createRecipe: function (){
			var user = this.get('controllers.application.currentUser', 'user.content[0].id');
			console.log(this.get('controllers.application.currentUser'));
			console.log(user.content[0].id);

			var newRecipe = this.store.createRecord ('recipe', {
				title: this.get('title'),
				author: user,
				type: this.get('selectedRecipeType'),
				prepTime: this.get('prepTime'),
				cookTime: this.get('cookTime'),
				cookTemp: this.get('cookTemp'),
				tempType: this.get('selectedTempType'),
				yieldAmount: this.get('yieldAmount'),
				yieldType: this.get('yieldType'),
				measurement: this.get('measurement'),
				measurementType: this.get('selectedMeasurementType'),
				personalNote: this.get('personalNote')
			});

			newRecipe.save();
			user.get('recipes').addObject(newRecipe);
			user.save();
			this.setProperties({
				title: '',
				author: '',
				type:'',
				prepTime: '',
				prepTime: '',
				cookTime: '',
				cookTemp: '',
				yieldAmount: '',
				yieldType: '',
				measurement:'',
				personalNote:''
			});
		},
	},
});

App.LoginController = Ember.Controller.extend ({
	needs: ['session'],
	actions: {
		login: function (){
			var credentials = this.getProperties('email', 'password');
      		this.get('controllers.session').authenticate(credentials);
		}
	}	
});

App.SignupController = Ember.Controller.extend({
	needs: ['session'],
	actions: {
	    createUser: function(){
	      var credentials = this.getProperties('email', 'password');
	      var self = this;
	      
	      App.ref.createUser(credentials, function(error){
	        	     console.log(credentials);
	        	     console.log(error);

	        if( !error ){
	        	console.log('dumb');
	          	self.get('controllers.session').authenticate(credentials).then(function(authData){
	          		     console.log('butthead');

	            var users = self.store.createRecord('user', {
	              id: authData.uid,
	              email: credentials.email
	            });

	            users.save();
	            self.setProperties ({
					email: '',
					password: ''
				});
	          });
	        }
	      });
	    }
	}
});

App.SessionController = Ember.Controller.extend({
	currentUser: null,
	authenticate: function(credentials){
		console.log(credentials);
    	return new Ember.RSVP.Promise(function(resolve, reject){
    		App.ref.authWithPassword(credentials, function(error, authData){
    		resolve(authData);
    		});
    	})
  	}
});