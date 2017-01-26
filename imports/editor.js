import * as Entities from '../imports/entities.js';

const TRUNCATE_LENGTH = 50;

let editor;
let entitySelector;

export function initialize() {
  entitySelector = document.getElementById('entity-selector');
  AceEditor.instance('ace-editor', {
    theme: 'dawn',
    mode: 'html'
  }, (editorInstance) => {
    editor = editorInstance;
    editor.setValue(Entities.getDefaultEntityString())
  })
};

Template.editor.events({
  'change #entity-selector': onChangeEntitySelector,
  'click .button-save': onClickSaveButton
});

function onChangeEntitySelector(event) {
  let displayText = Entities.getDefaultEntityString();
  let entity = Entities.getEntity(event.target.value)
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
  let entityString = editor.getValue();
  Entities.updateOrCreateEntity(id, entityString);
}

Template.editor.helpers({
  entities: () => {
    return Entities.getAllEntities();
  },
  truncate: (text) => {
    return text.slice(0, TRUNCATE_LENGTH);
  }
});
