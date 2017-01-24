import { Meteor } from 'meteor/meteor';

let Entities = new Mongo.Collection('entities');

Entities.allow({
  insert: (userId, doc) => {
    return true;
  }
});

Meteor.publish('all-entitites', function () {
  return Entities.find();
});
