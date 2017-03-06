import { Meteor } from 'meteor/meteor';
import { getGuestUsername, serverUsersInitialize } from '../imports/users.js';
const QUERY_RADIUS = 100;
const ADMIN = 'morpheus';

let Entities = new Mongo.Collection('entities');

Meteor.startup(() => {
  serverEntitiesInitialize();
  serverUsersInitialize();
});



Meteor.onConnection((connection) => {
  // create a temporary user entity for the guest
  // console.log(`connection ${connection.id}`);

  // delete the user if it's a guest and everything they created
  connection.onClose(() => {
    console.log(`connection lost ${connection.id}`);
    Entities.remove({contributors: getGuestUsername(connection.id)});
  });
});

// consider moving this to its own module
function serverEntitiesInitialize() {
  Entities._ensureIndex({'location.coordinates':'2d'});

  Entities.allow({
    insert: (userId, doc) => {
      return true;
    },
    update: (userId, doc) => {
      return doc.contributors.includes(userId) || userId === ADMIN || doc.madeByGuest;
    },
    remove: (userId, doc) => {
      return doc.contributors.includes(userId) || userId === ADMIN || doc.madeByGuest;
    }
  });

  Meteor.publish('current-user', function () {
      return Entities.find({_id: this.userId});
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
