import { Meteor } from 'meteor/meteor';
const QUERY_RADIUS = 5;
let Entities = new Mongo.Collection('entities');
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
