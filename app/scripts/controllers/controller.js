App.ApplicationController = Ember.ObjectController.extend ({
	// currentUser: Ember.computed.alias('model'),
});


App.RecipesCreateController = Ember.Controller.extend ({
	needs: ['session'],
	tempType: ['°F','°C'],
	recipeType: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Anytime'],
	measurementType: ['Cups','Grams','Tablespoons','Ounces'],

	actions: { 
		createRecipe: function (){
			var user = this.get('controllers.session.currentUser', 'currentUser');
			
			console.log("User",user);
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
      		this.transitionToRoute('recipes');

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

	        if( !error ){
	        	console.log('dumb');
	          	self.get('controllers.session').authenticate(credentials).then(function(authData){
	          	console.log('butthead');
                    var users = self.store.createRecord('user', {
	                        id: authData.uid,
	                        email: credentials.email
	                    });
	                    console.log('cool')
	                    users.save();

	            self.setProperties ({
					email: '',
					password: ''
				});
	          });
	        } else{
	        	console.log(error);
	        }
	      });
	    }
	}
});

App.SessionController = Ember.Controller.extend({
    currentUser: null,
    authenticate: function(credentials) {
        console.log(credentials);
        var self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            App.ref.authWithPassword(credentials, function(error, authData) {
            	if (authData){
            		console.log("User",authData);
	                // if (!self.store.find('user', authData.uid)) {
	                    var users = self.store.createRecord('user', {
	                        id: authData.uid,
	                        email: credentials.email
	                    });
	                    console.log('cool')
	                    users.save();
	                // } else {
	                    self.store.find('user', authData.uid).then(function(user) {
	                        self.set('currentUser', user);
	               			localStorage.setItem('currentUser', authData.uid);
	                    });
	                // }
	                resolve(authData);
            	}
            	else {
            		console.log(error);
            	}
            })
        })
    }
});