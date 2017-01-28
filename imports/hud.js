let editorElement;
let flashElement;
let editorOpen = new ReactiveVar(false);

export function initialize() {
  editorElement = document.getElementById('editor');
  flashElement = document.getElementById('flash-message');
}

export function flashMessage(text) {
  flashElement.textContent = text;
  flashElement.classList.remove('not-visible');
  setTimeout(() => {
    flashElement.classList.add('not-visible');
    flashElement.textContent = '';
  }, 3000);

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
}

function closeEditor() {
  editorOpen.set(false);
  editorElement.classList.add('not-visible');
}
