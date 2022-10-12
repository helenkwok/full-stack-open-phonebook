describe('phonebook', function() {
  it('info page can be opened', function() {
    cy.visit('http://localhost:3001/info')
    cy.contains('Phonebook has info')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Phonebook')
  })
})