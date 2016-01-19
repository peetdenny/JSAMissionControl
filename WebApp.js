Rockets = new Mongo.Collection('rockets');



if (Meteor.isClient) {
	Template.body.helpers({
		rockets: function() {
			return Rockets.find();
		} 
			
	});


    Template.body.events({
        'submit .new-rocket': function(event){
            Rockets.insert({
                name: event.target.name.value,
                mass: event.target.mass.value,
                class: event.target.class.value,
                thrust: event.target.thrust.value,
                construction: event.target.construction.value,
                createAt: new Date()
            });

            event.target.name.value = "";
            event.target.mass.value = "";
            event.target.class.value = "";
            event.target.thrust.value = "";
            event.target.construction.value = "";

            return false;
        }
    });

    Template.rocket.events({
        'click .delete': function(){
            Rockets.remove(this._id);
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
