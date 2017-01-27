// turn this into a system?

import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Users from '../imports/users.js';

let scene;
let Entities = new Mongo.Collection('entities');

export function clientInitialize() {
  Meteor.subscribe('nearby-entities', [0, 0]);
  scene = document.getElementById('scene');
  console.log('loading entity module...');
  Entities.find().observeChanges({
    added: onEntityAdded,
    changed: onEntityChanged,
    removed: onEntityRemoved
  });

  // set up the current user's entity (body)
  Tracker.autorun((computation) => {
    // ideally we could just use Meteor.status().connected, but _lastSessionId
    // might not be set on Meteor.connection even when it's true so we set this
    // Meteor global Session variable
    if (!Session.get('sessionId')) {
      return;
    }
    let userName = Users.getCurrentUsername();
    let userEntity = Entities.findOne({name: userName});
    if (userEntity) {
      // remove a guest entity for this connection it
      // exists
    } else {
      // create a guest entity
      let userEntity = createUserEntity(userName);
      // set userEntity to this new entity
    }
    // set the user's entity to match the user's
    // camera and controls
    computation.stop();
  });
}

export function getDefaultEntityString() {
  let userPosition = Users.getUserPosition();
  return `<a-sphere meteor-persist radius=".3" color="green" position="${userPosition.x} ${userPosition.y} ${userPosition.z}"></a-sphere>`;
}

function onEntityAdded(entityId) {
  let entity = Entities.findOne(entityId);
  addEntityToScene(entity._id, entity.text);
}

function onEntityChanged(entityId, changedFields) {
  // can do all this w/o cloning so change if performance suffers
  let currentEntityElement = document.getElementById(entityId).cloneNode();
  currentEntityElement.removeAttribute('id');
  let updatedEntityString = changedFields.text;
  if (currentEntityElement.outerHTML !== updatedEntityString) {
    let updatedEntityElement = DOMHelpers.stringToDomElement(updatedEntityString);

    // for simplicity, move this to if tag changes if block
    removeEntityFromScene(entityId);
    addEntityToScene(entityId, updatedEntityString);
    // if the tag changed replace the whole thing
    if (updatedEntityElement.tagName != currentEntityElement.tagName) {

    } else {
      // otherwise just set the attributes that are different

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

export function createDefaultEntity() {
  return createOrUpdateEntity(null, {text: getDefaultEntityString()})
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
    }

    entityElement.removeAttribute('id');
    entityString = entityElement.outerHTML;
    entityProperties.text = entityString;
    entityProperties.location = {
      type: 'Point',
      coordinates: [position.x, position.z]
    }
  }

  if (id) {
    Entities.update({_id: id}, {$set: entityProperties});
  } else {
    id = Entities.insert(entityProperties);
  }
  entityProperties.id = id;
  return entityProperties;
}

export function createUserEntity(username) {
  let entityString = Users.getDefaultUserString(username);
  return createOrUpdateEntity(null, {text: entityString, name: username});
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
