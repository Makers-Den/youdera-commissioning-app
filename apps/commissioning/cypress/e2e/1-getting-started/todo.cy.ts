/// <reference types="cypress" />

import { getByName } from 'cypress/utils/getByName';

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('displays email input', () => {
    getByName('email').should('be.visible');
  });
});
