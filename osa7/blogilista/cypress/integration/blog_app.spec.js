describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Mika Tonteri',
      username: 'mton',
      password: 'testipassu',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:8080');
  });
  it('loads login screen', function() {
    cy.contains('login');
  });
  it('does not log in with incorrect credentials', function() {
    cy.get('#username').type('väärä');
    cy.get('#password').type('väärä');
    cy.contains('login').click();
    expect(401);
  });
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mton');
      cy.get('#password').type('testipassu');
      cy.contains('login').click();
    });
    it('does not create a new blog post with missing data', function() {
      cy.contains('new blog').click();
      cy.contains('create new');
      cy.get('#blog-title').type('testi');
      cy.contains('submit').click();
      expect(400);
    });
    it('creates a new blog post with correct data', function() {
      cy.contains('new blog').click();
      cy.contains('create new');
      cy.get('#blog-title').type('Testi otsikko');
      cy.get('#blog-author').type('Testi Kirjoittaja');
      cy.get('#blog-url').type('http://www.testi.dev');
      cy.contains('submit').click();
      expect(200);
    });
    it('lists the blogs', function() {
      cy.contains('new blog').click();
      cy.contains('create new');
      cy.get('#blog-title').type('Testi otsikko');
      cy.get('#blog-author').type('Testi Kirjoittaja');
      cy.get('#blog-url').type('http://www.testi.dev');
      cy.contains('submit').click();
      cy.contains('blogs').click();
      cy.get('#blog-list')
        .its('length')
        .should('eq', 1);
    });
  });
});
