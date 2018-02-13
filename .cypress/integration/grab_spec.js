describe('Grab test', () => {
    it('can move an object', () => {
        cy.visit('http://localhost:3000');
        cy.get('a-scene').type('{shift}r');
    });
});