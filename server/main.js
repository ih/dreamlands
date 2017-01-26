import { Meteor } from 'meteor/meteor';
const QUERY_RADIUS = 5;

let Entities = new Mongo.Collection('entities');

serverEntitiesInitialize();

Meteor.onConnection((connection) => {
  // create a temporary user entity for the guest


  // delete the user if it's a guest and everything they created
  connection.onClose(() => {

  });
})

Accounts.onCreateUser((options, user) => {
   Entities.createUserEntity(user.username);
});

// consider moving this to its own module
function serverEntitiesInitialize() {
  Entities._ensureIndex({'location.coordinates':'2d'});

  Entities.allow({
    insert: (userId, doc) => {
      return true;
    },
    update: (userId, doc) => {
      return true;
    }
  });

  Meteor.publish('nearby-entities', function (location) {
    console.log(`getting entities near ${JSON.stringify(location)}`);
    return Entities.find({
      location: {
        $geoWithin: {$center: [location, QUERY_RADIUS]}
      }
    });
  });
}
