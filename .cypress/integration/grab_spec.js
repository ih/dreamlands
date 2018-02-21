// import { dispatchKeyDown } from '../support/commands';
import { Keyboard } from '../support/keyboard';
import { Hand } from '../support/hand_controls';

describe('Grab test', () => {
    it('can move an object', () => {
        cy.visit('http://localhost:3000');
        cy.window().then((window) => {

            let leftHand = new Hand(window.document, 'left-hand');
            let keyboard = new Keyboard(window.document);
            // dispatchKeyDown(window.document, 'Shift');
            // dispatchKeyDown(window.document, 'r');
            keyboard.dispatchKeyDown('Shift');
            keyboard.dispatchKeyDown('r');

            //leftHand.moveLeft(50);
            for (let i = 0; i < 10; i++) {
                keyboard.dispatchKeyDown('a');
            }
        });
    });
});