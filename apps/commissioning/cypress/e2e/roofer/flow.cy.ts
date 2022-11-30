/// <reference types="cypress" />

import { credentials } from '../../fixtures/credentials';
import LoginPage from '../../pages/login.page';

describe('roofer', () => {
  const { roofer: { email, password } } = credentials
  // it("roofer's settings", () => {
  //   new LoginPage()
  //     .visit()
  //     .login({ email: 'roo@fer.com', password: 'roofer123' })
  //     .navbar.openUserSettings()
  //     .form.editGeneralDetails()
  // })

  it("basic flow", () => {
    new LoginPage()
      .visit()
      .login({ email, password })
      .selectComissioning()
      .selectProjectAsRoofer()
      .selectModule()
      .addModuleField()
      .next()
      .confirm()
      .uploadStringLayout()
      .next()
      .confirm()
      .goToMainMenu()
      .navbar.logout()
      .checkIfLogout()
  })
});
