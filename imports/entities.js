import * as DOMHelpers from '../imports/dom-helpers.js'

Meteor.subscribe('nearby-entities', [0, 0]);
let domParser = new DOMParser();
let scene;
let Entities = new Mongo.Collection('entities');

export function initialize() {
  scene = document.getElementById('scene');
  console.log('loading entity module...');
  Entities.find().observeChanges({
    added: (entityId) => {
      let entity = Entities.findOne(entityId);
      addEntityToScene(entity);
    }
  });
};

// TODO change to createDefaultEntity and have meteor-persist create or update
export function createEntity() {
  let userPosition = document.querySelector('#user-camera').getAttribute('position');
  let defaultEntityString = `<a-sphere meteor-persist radius=".3" color="green" position="${userPosition.x} ${userPosition.y} ${userPosition.z}"></a-sphere>`;

  Entities.insert({
    text: defaultEntityString,
    location: {
      type: 'Point',
      coordinates: [userPosition.x, userPosition.z]
    }
  });
}

export function updateEntity(id, entityString) {
  let entityElement = DOMHelpers.stringToDomElement(entityString);
  let position = DOMHelpers.positionStringToObject(
      entityElement.getAttribute('position'));
  entityElement.removeAttribute('id');
  entityString = entityElement.outerHTML;
  if (id) {
    Entities.update({_id: id}, {$set: {
      text: entityString,
      location: {
        type: 'Point',
        coordinates: [position.x, position.z]
      }}
    });
  }
}

export function addEntityToScene(entity) {
  let domElement = DOMHelpers.stringToDomElement(entity.text);
  domElement.setAttribute('id', entity._id);
  scene.appendChild(domElement);
}
