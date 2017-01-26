import { Template } from 'meteor/templating-runtime';
import { ReactiveVar } from 'meteor/reactive-var';

import * as Entities from '../imports/entities.js';
import * as KeyboardControls from '../imports/keyboard-controls.js';
import * as HandControls from '../imports/hand-controls.js';
import * as Editor from '../imports/editor.js';
import '../imports/meteor-persist.js'

import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.body.onRendered(() => {
  Entities.clientInitialize();
  KeyboardControls.addKeyboardEvents();
  HandControls.addHandEvents();
  Editor.initialize();
});
