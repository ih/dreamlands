// import { dispatchKeyDown } from '../support/commands';
import * as Keyboard from '../support/keyboard';

describe('Grab test', () => {
    it('can move an object', () => {
        cy.visit('http://localhost:3000');
        cy.window().then((window) => {

            //let leftHand = new Hand(window.document, 'left-hand');
            Keyboard.initialize(window.document);
            // Keyboard.dispatchKeyDown('Shift');
            // Keyboard.dispatchKeyDown('r');
            Keyboard.handAction(Keyboard.LEFT_HAND, Keyboard.MENU);
            Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.LEFT, 22);
            Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.UP, 14);
            Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.BACK, 19);
            Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.TRIGGER);



            //leftHand.moveLeft(50);
            // for (let i = 0; i < 20; i++) {
            //     Keyboard.dispatchKeyDown('a');
            // }
        });
    });
});