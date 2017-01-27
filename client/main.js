import { Template } from 'meteor/templating-runtime';
import { ReactiveVar } from 'meteor/reactive-var';

import * as Entities from '../imports/entities.js';
import * as KeyboardControls from '../imports/keyboard-controls.js';
import * as HandControls from '../imports/hand-controls.js';
import * as Editor from '../imports/editor.js';

// components
import '../imports/meteor-persist.js';
import '../imports/user-camera.js';
import '../imports/user-hand-controls.js'
import '../imports/user.js';

import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.body.onRendered(() => {
  // poll for the connection id since Meteor.connection._lastSessionId might not
  // be set even if Meteor.status().connected is true
  // kind of a hack
  let sessionIdPoller = setInterval(() => {
    if (Meteor.connection._lastSessionId) {
      Session.set('sessionId', Meteor.connection._lastSessionId);
      clearInterval(sessionIdPoller);
    }
  }, 100);
  Entities.clientInitialize();
  KeyboardControls.addKeyboardEvents();
  HandControls.addHandEvents();
  Editor.initialize();
});
