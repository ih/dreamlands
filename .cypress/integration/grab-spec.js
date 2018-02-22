// import { dispatchKeyDown } from '../support/commands';
import * as Keyboard from '../support/keyboard';
import * as RightHand from '../support/right-hand';

describe('Grab test', () => {
    it('can move an object', () => {
        cy.visit('http://localhost:3000');
        cy.window().then((window) => {

            //let leftHand = new Hand(window.document, 'left-hand');
            Keyboard.initialize(window.document);
            // dispatchKeyDown(window.document, 'Shift');
            // dispatchKeyDown(window.document, 'r');
            Keyboard.dispatchKeyDown('Shift');
            Keyboard.dispatchKeyDown('r');

            //leftHand.moveLeft(50);
            for (let i = 0; i < 20; i++) {
                Keyboard.dispatchKeyDown('a');
            }
        });
    });
});