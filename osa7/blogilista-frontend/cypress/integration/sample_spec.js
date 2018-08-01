describe('First tests', () => {
  it('Visit the front page', () => {
    cy.visit('http://localhost:3000');

    cy.get('.loginToggleButton').click();

    cy.get('.usernameInput')
      .type('user1')
      .should('have.value', 'user1');

    cy.get('.passwordInput')
      .type('password1')
      .should('have.value', 'password1');

    cy.get('.loginButton').click();

    cy.contains('Blogs');
    cy.contains('Users');
    cy.contains('Add blog');
    cy.contains('Logout');
    cy.contains('logged in');
  });
});