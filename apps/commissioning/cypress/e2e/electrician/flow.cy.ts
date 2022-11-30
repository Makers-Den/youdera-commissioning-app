/// <reference types="cypress" />

import LoginPage from '../../pages/login.page';
import { credentials } from '../../fixtures/credentials';
describe('electrician', () => {
  const { electrician: { email, password } } = credentials

  //TODO
  // it("electrician's settings", () => {
  //   new LoginPage()
  //     .visit()
  //     .login({ email: 'roo@fer.com', password: 'roofer123' })
  //     .navbar.openUserSettings()
  //     .form.editGeneralDetails()
  // })

  it('basic flow', () => {
    new LoginPage()
      .visit()
      .login({ email, password })
      .selectComissioning()
      .selectProjectAsElectrician()
      .selectGateway()
      .addInverter()
      .testCommunication('inverters')
      .addMeter()
      .testCommunication('meters')
      .addBattery()
      .testCommunication('batteries')
      .next()
      .testAndVerifyAllDevices()
      .finish()
      .goToMainMenu()
      .navbar.logout()
      .checkIfLogout()
  });
});
