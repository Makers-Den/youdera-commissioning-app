class AbstractPage {
  constructor() {
    // An AuthenticationError is thrown for some reason
    Cypress.on("uncaught:exception", () => {
      return false
    })
  }

  checkPathname(expectedPathName: string) {
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(expectedPathName)
    })
  }

  assertPageContent(expectedTitle: string) {
    this.getCy("main").should('contain', expectedTitle)
  }

  getName(selector: string) {
    return cy.get(`[name="${selector}"]`)
  }

  getCy(selector: string) {
    return cy.get(`[data-cy="${selector}"]`)
  }

  getId(selector: string) {
    return cy.get(`#${selector}`)
  }
}

export default AbstractPage
