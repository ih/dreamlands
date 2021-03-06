import * as Entities from '../imports/entities.js';
import * as HUD from '../imports/hud.js';

const TRUNCATE_LENGTH = 50;

let editor;
let editorElement;
let entitySelector;

export function initialize() {
  editorElement = document.getElementById('editor');
  entitySelector = document.getElementById('entity-selector');
  AceEditor.instance('ace-editor', {
    theme: 'dawn',
    mode: 'html'
  }, (editorInstance) => {
    editor = editorInstance;
    editor.setValue(Entities.getDefaultEntityString());
    // make sure the position of the default object is the
    // position of the user if they open the editor to the default option
    editorElement.addEventListener('openEditor', (event) => {
      if (!entitySelector.options[entitySelector.selectedIndex].value) {
        editor.setValue(Entities.getDefaultEntityString());
      }
    });
  });
};

Template.editor.events({
  'change #entity-selector': onChangeEntitySelector,
  'click .button-save': onClickSaveButton,
  'click .button-delete': onClickDelete
});

function onChangeEntitySelector(event) {
  let displayText = Entities.getDefaultEntityString();
  let entity = Entities.getEntity(event.target.value);
  if (entity) {
    displayText = entity.text;
  }
  var cursorPosition = editor.getCursorPosition();
  editor.setValue(displayText);
  editor.moveCursorToPosition(cursorPosition);
  editor.clearSelection();
}

function onClickSaveButton(event) {
  let id = entitySelector.options[entitySelector.selectedIndex].value;
  if (id && !Entities.isContributor(Meteor.userId(), id)) {
    HUD.flashMessage(`You are not allowed to modify this entity.`);
    return;
  }
  let errors = editor.getSession().getAnnotations().filter((annotation) => {
    return annotation.type === 'error';
  });
  if (errors.length > 0) {
    HUD.flashMessage(`Please fix errors with the syntax. \n
    Hover over the red "x"s in the editor for more details`);
    return;
  }
  let entityString = editor.getValue();
  Entities.createOrUpdateEntity(id, {text: entityString});
}

function onClickDelete(event) {
  let id = entitySelector.options[entitySelector.selectedIndex].value;
  if (id && !Entities.isContributor(Meteor.userId(), id)) {
    HUD.flashMessage(`You are not allowed to delete this entity.`);
    return;
  }
  Entities.removeEntity(id);
}

Template.editor.helpers({
  entities: () => {
    return Entities.getAllEntities();
  },
  truncate: (text) => {
    return text.slice(0, TRUNCATE_LENGTH);
  },
  contributorList: (contributorList) => {
    return contributorList[0].slice(0, 10);
  }
});
