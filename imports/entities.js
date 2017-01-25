// turn this into a system?

import * as DOMHelpers from '../imports/dom-helpers.js'

Meteor.subscribe('nearby-entities', [0, 0]);
let domParser = new DOMParser();
let scene;
let Entities = new Mongo.Collection('entities');

export function getDefaultEntityString() {
  let userPosition = document.querySelector('#user-camera').getAttribute('position');
  return `<a-sphere meteor-persist radius=".3" color="green" position="${userPosition.x} ${userPosition.y} ${userPosition.z}"></a-sphere>`;
}
export function initialize() {
  scene = document.getElementById('scene');
  console.log('loading entity module...');
  Entities.find().observeChanges({
    added: onEntityAdded,
    changed: onEntityChanged
  });
};

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

export function getEntity(id) {
  return Entities.findOne(id);
}

export function getAllEntities() {
  return Entities.find().fetch();
}

// TODO change to createDefaultEntity and have meteor-persist create or update
export function createDefaultEntity() {
  updateOrCreateEntity(null, getDefaultEntityString())
}

export function updateOrCreateEntity(id, entityString) {
  let entityElement = DOMHelpers.stringToDomElement(entityString);
  let position = DOMHelpers.positionStringToObject(
      entityElement.getAttribute('position'));
  entityElement.removeAttribute('id');
  entityString = entityElement.outerHTML;
  entityProperties = {
    text: entityString,
    location: {
      type: 'Point',
      coordinates: [position.x, position.z]
    }
  };
  if (id) {
    Entities.update({_id: id}, {$set: entityProperties});
  } else {
    Entities.insert(entityProperties);
  }
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
