import { Template } from 'meteor/templating-runtime';
import { ReactiveVar } from 'meteor/reactive-var';

import * as Entities from '../imports/entities.js';
import * as KeyboardControls from '../imports/keyboard-controls.js';
import * as HandControls from '../imports/hand-controls.js';

import './main.html';


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe('all-entities');

Template.body.onRendered(() => {
  Entities.initialize();
  KeyboardControls.addKeyboardEvents();
  HandControls.addHandEvents();
});
