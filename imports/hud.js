let editorElement;
let editorOpen = new ReactiveVar(false);

export function initialize() {
  editorElement = document.getElementById('editor');
}

Template.hud.helpers({
  editorOpen: () => {
    return editorOpen.get();
  }
});

Template.hud.events({
  'click .open-editor': openEditor,
  'click .close-editor': closeEditor
});

function openEditor() {
  editorOpen.set(true);
  editorElement.classList.remove('not-visible');
  editorElement.classList.add('visible');
}

function closeEditor() {
  editorOpen.set(false);
  editorElement.classList.remove('visible');
  editorElement.classList.add('not-visible');
}
