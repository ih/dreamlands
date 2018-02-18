describe('Grab test', () => {
    it('can move an object', () => {
        cy.visit('http://localhost:3000');
        cy.wait(5000);
        cy.window().then((window) => {
            let keyEvent = new KeyboardEvent('keydown', {key: 'Shift'});
            window.document.dispatchEvent(keyEvent);
            let keyEvent2 = new KeyboardEvent('keydown', {key: 'r'});
            window.document.dispatchEvent(keyEvent2);
        });
    });
});