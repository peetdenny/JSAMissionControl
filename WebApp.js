Rockets = new Mongo.Collection('rockets');



if (Meteor.isClient) {
	Template.body.helpers({
		rockets: function() {
            return Rockets.find();
        }
	});

    Template.rocket.helpers({
        user: function(){
            return Meteor.user().profile.name;
        },
        isCreator: function(){
            return Meteor.userId() === this.creator;
        }


    });


    Template.body.events({
        'submit .new-rocket': function(event){
            var form = event.target;
            Meteor.call("addRocket", form.name.value, form.mass.value, form.class.value, form.thrust.value, form.construction.value, Meteor.userId());
           form.name.value = "";
           form.mass.value = "";
           form.class.value = "";
           form.thrust.value = "";
           form.construction.value = "";
            return false;
        }
    });

    Template.rocket.events({
        'click .delete': function(){
            Meteor.call("deleteRocket",this._id);
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Meteor.methods({
    addRocket: function(name, mass, clazz, thrust, construction, userId){
        Rockets.insert({
            name: name,
            mass: mass,
            class: clazz,
            thrust: thrust,
            construction: construction,
            createAt: new Date(),
            creator: userId
        });
    },

    deleteRocket: function(id){
        Rockets.remove(id);
    }
});
