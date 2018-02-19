import { dispatchKeyDown } from '../support/commands';
import { Hand } from '../support/hand_controls';

describe('Grab test', () => {
    it('can move an object', () => {
        cy.visit('http://localhost:3000');
        cy.window().then((window) => {

            let leftHand = new Hand(window.document, 'left-hand');
            leftHand.moveLeft(.5);
            dispatchKeyDown(window.document, 'Shift');
            dispatchKeyDown(window.document, 'r');

        });
    });
});