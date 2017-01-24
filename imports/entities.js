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

export function createEntity() {
  let userPosition = document.querySelector('#user-camera').getAttribute('position');
  let defaultEntityString = `<a-sphere radius=".3" color="green" position="${userPosition.x} ${userPosition.y} ${userPosition.z}"></a-sphere>`;

  Entities.insert({
    text: defaultEntityString,
    location: {
      type: 'Point',
      coordinates: [
        userPosition.x,
        userPosition.z
      ]
    }
  });
}

export function addEntityToScene(entity) {
  // let domElement = domParser.parseFromString(entity.text, 'text/html').body.firstChild;
  var div = document.createElement( "div" );
  div.innerHTML = entity.text;
  //domElement.setAttribute('id', entity._id);
  scene.appendChild(div.firstChild);
}

function append ( elString, parent ) {
    var div = document.createElement( "div" );
    div.innerHTML = elString;
    document.querySelector( parent || "body" ).appendChild( div.firstChild );
 }
