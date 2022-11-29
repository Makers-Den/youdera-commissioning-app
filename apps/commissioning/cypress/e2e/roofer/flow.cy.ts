/// <reference types="cypress" />

import LoginPage from '../../pages/login.page';

describe('roofer', () => {
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
      .login({ email: 'roo@fer.com', password: 'roofer123' })
      .selectComissioning()
      .selectProject()
      .selectModule()
      .next()
      .confirm()
      .uploadStringLayout()
      .next()
      .confirm()
  })
});
