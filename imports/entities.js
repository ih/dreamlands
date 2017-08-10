// turn this into a system?

import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Users from '../imports/users.js';
import * as Utility from '../imports/utility.js';
import * as HUD from '../imports/hud.js';

const LOCATION_POLLING_TIME = 5000;
const DISTANCE_THRESHOLD = 3;
let scene;
let Entities = new Mongo.Collection('entities');
// see http://docs.meteor.com/api/reactive-var.html particularly the equality
// function, this will only trigger a reactive computation once the user is
// > DISTANCE_THRESHOLD from the last position
let userLocation = ReactiveVar([0, 0], (oldValue, newValue) => {
    return Utility.distance(oldValue, newValue) < DISTANCE_THRESHOLD;
});

export function clientInitialize() {
  // we get nearby entities by periodically updating the user's position
  setInterval(() => {
    let currentUserPosition = Users.getUserPosition();
    userLocation.set([currentUserPosition.x, currentUserPosition.z]);
  }, LOCATION_POLLING_TIME);
  // we put this into a reactive computation instead of a polling loop b/c
  // this will automatically unsubscribe from previous subscriptions
  // http://docs.meteor.com/api/pubsub.html#Meteor-subscribe
  Tracker.autorun((computation) => {
    console.log('loading new stuff');
    Meteor.subscribe('nearby-entities', userLocation.get());
  });

  scene = document.getElementById('scene');
  console.log('loading entity module...');
  Entities.find().observeChanges({
    added: onEntityAdded,
    changed: onEntityChanged,
    removed: onEntityRemoved
  });

  // set up the current user's entity (body) if they don't have an account
  Tracker.autorun((computation) => {
    // ideally we could just use Meteor.status().connected, but _lastSessionId
    // might not be set on Meteor.connection even when it's true so we set this
    // Meteor global Session variable
    if (!Session.get('sessionId')) {
      return;
    }
    let userName = Users.getCurrentUsername();
    let userEntity = Entities.findOne(userName);
    if (!userEntity) {
      let userEntity = createUserEntity(userName);
    }
    // stop the computation otherwise it gets called again if a user entity
    // was created or if any guest logs out since their entity gets removed
    // alternatively wrap the Entities.findOne as a nonreactive
    computation.stop();
  });

  Accounts.onLogin(() => {
    // remove a guest entity for this connection if it
    // exists
    Entities.remove({_id: Users.getGuestUsername(Session.get('sessionId'))});
    // we have a separate subscription for the user since their body might be
    // out of range for the nearby-entities subscription
    Meteor.subscribe('current-user', null, () => {
      let userEntity = Entities.findOne(Users.getCurrentUsername());
      if (userEntity) {
        Users.signalUserControlsUserEntitySync();
      } else {
        createUserEntity(Users.getCurrentUsername());
      }
    });
  });
}

export function getDefaultEntityString() {
  let userPosition = Users.getUserPosition();
  return `<a-sphere class="collidable" radius=".3" color="green" grabbable hoverable position="${userPosition.x} ${userPosition.y} ${userPosition.z}"></a-sphere>`;
}

function onEntityAdded(entityId) {
  let entity = Entities.findOne(entityId);
  addEntityToScene(entity._id, entity.text);
}

function onEntityChanged(entityId, changedFields) {
  let currentEntityElement = document.getElementById(entityId);
  // since we don't store the id in the db we clone and remove it when
  // comparing string representations
  // we can do all this w/o cloning so change if performance suffers
  let currentEntityElementWithoutId = currentEntityElement.cloneNode(true);
  currentEntityElementWithoutId.removeAttribute('id');
  let updatedEntityString = changedFields.text;
  if (currentEntityElementWithoutId.outerHTML !== updatedEntityString) {
    let updatedEntityElement = DOMHelpers.stringToDomElement(updatedEntityString);
    // if the tag changed replace the whole thing
    if (updatedEntityElement.tagName != currentEntityElement.tagName) {
      currentEntityElement.setAttribute('id', entityId);
      removeEntityFromScene(entityId);
      addEntityToScene(entityId, updatedEntityString);
    } else {
      // otherwise just set the attributes that are different
      updatedEntityElement.setAttribute('id', entityId);
      let elementsMatched = DOMHelpers.matchElement(currentEntityElement, updatedEntityElement);
      if (!elementsMatched) {
        console.log('problems matching elements');
      }
    }
  }
}

function onEntityRemoved(entityId) {
  removeEntityFromScene(entityId);
}

export function getEntity(id) {
  return Entities.findOne(id);
}

export function getAllEntities() {
  return Entities.find().fetch();
}

export function removeEntity(id) {
  Entities.remove(id);
}

export function createDefaultEntity() {
  return createOrUpdateEntity(null, {text: getDefaultEntityString()});
}

export function createOrUpdateEntity(id, entityProperties) {
  // we don't want the id of the element to be user facing (since we dynamically)
  // add it when the element is added to the dom so strip it before saving to the db
  // and update the position of the entity so that it is location queryable
  if ('text' in entityProperties) {
    let entityElement = DOMHelpers.stringToDomElement(entityProperties.text);
    let position = entityElement.getAttribute('position');
    if (position) {
      position = DOMHelpers.positionStringToObject(position);
    } else {
      position = Users.getUserPosition();
      let positionString = DOMHelpers.positionObjectToString(position);
      // this doesn't seem to work, but may be a problem w/ a-frame so leave
      // it in for now
      // maybe there is an aframe wrapper for dom elements
      entityElement.setAttribute(positionString);
    }

    entityElement.removeAttribute('id');
    let entityString = entityElement.outerHTML;
    entityProperties.text = entityString;
    entityProperties.location = {
      type: 'Point',
      coordinates: [position.x, position.z]
    };
  }

  // a hack to get around allow rules since we can't get access to the connection
  // id on the
  if (!Meteor.userId() && !id) {
    entityProperties.madeByGuest = true;
  }

  if (id) {
    Entities.update({_id: id}, {$set: entityProperties});
  } else {
    if (!('contributors' in entityProperties)) {
      entityProperties.contributors = [Users.getCurrentUsername()];
    }
    id = Entities.insert(entityProperties);
  }

  entityProperties.id = id;
  return entityProperties;
}

export function createUserEntity(username) {
  let entityString = Users.getDefaultUserString(username);
  return createOrUpdateEntity(null, {
    text: entityString,
    name: username, _id: username
  });
}

export function addEntityToScene(id, entityString) {
  let domElement = DOMHelpers.stringToDomElement(entityString);
  if (id) {
    domElement.setAttribute('id', id);
  }
  scene.appendChild(domElement);
}

export function removeEntityFromScene(id) {
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

export function isContributor(userId, entityId) {
  let entity = Entities.findOne(entityId);
  if (entity) {
    return entity.contributors.includes(userId);
  }
  console.error(`no entity found for id ${entityId}`);
  return false;
}
