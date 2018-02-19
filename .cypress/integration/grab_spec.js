import { dispatchKeyDown } from '../support/commands';

describe('Grab test', () => {
    it('can move an object', () => {
        cy.visit('http://localhost:3000');
        cy.window().then((window) => {
            dispatchKeyDown(window.document, 'Shift');
            dispatchKeyDown(window.document, 'r');
        });
    });
});