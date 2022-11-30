import { getRandomNumber } from "../../utils/generateRandomData"
import AbstractPage from "../abstract.page"
import ConfirmationDialog from "../confirmation-dialog.component"
import ModuleFieldsPage from "../roofer/module-fields.page"
import NavbarComponent from "../navbar.component"
import TestPage from "./test.page"
import { testKey } from "../../fixtures/backend-keys"

class DevicesPage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Devices')
    this.navbar = new NavbarComponent()
  }

  addInverter() {
    this.getCy('dropdown-btn').click()
    this.getCy('add-inverter-btn').click()
    this.getCy('manufacturer').click()
    this.getCy('manufacturer-option').first().click()
    this.getCy('model').click()
    this.getCy('select-option').first().click()
    this.getCy('upload')
      .first()
      .selectFile({ contents: 'cypress/fixtures/test.png' }, { force: true });
    this.getCy('submit-btn').click()
    cy.wait(1000)
    this.getCy('toast').first().should('contain', 'Inverter added successfully!');

    return this
  }

  addMeter() {
    this.getCy('dropdown-btn').click()
    this.getCy('add-meter-btn').click()
    new ConfirmationDialog<DevicesPage>().confirm()
    this.getCy('meter-type').click()
    this.getCy('select-option').first().click()
    this.getCy('manufacturer').click()
    this.getCy('manufacturer-option').first().click()
    this.getCy('model').click()
    this.getCy('select-option').first().click()
    this.getCy('factor').type(getRandomNumber(1, 9))
    this.getCy('serial-number').type(getRandomNumber(100000000000, 999999999999))
    this.getCy('connected-inverters').click()
    this.getCy('multi-select-option').first().click()
    this.getCy('connected-inverters').click()
    this.getCy('auxiliary-meter').click()
    this.getCy('upload')
      .first()
      .selectFile({ contents: 'cypress/fixtures/test.png' }, { force: true });
    this.getCy('submit-btn').click()
    cy.wait(1000)
    this.getCy('toast').first().should('contain', 'Meter added successfully!');
    return this
  }

  addBattery() {
    this.getCy('dropdown-btn').click()
    this.getCy('add-battery-btn').click()
    this.getCy('manufacturer').click()
    this.getCy('manufacturer-option').first().click()
    this.getCy('model').click()
    this.getCy('select-option').first().click()
    this.getCy('inverter').click()
    this.getCy('select-option').first().click()
    this.getCy('upload')
      .first()
      .selectFile({ contents: 'cypress/fixtures/test.png' }, { force: true });
    this.getCy('submit-btn').click()
    cy.wait(1000)
    this.getCy('toast').first().should('contain', 'Battery added successfully!');

    return this
  }

  testCommunication(deviceType: 'inverters' | 'meters' | 'batteries') {
    this.getCy('select-method').click()
    this.getCy('select-option').first().click()
    this.getCy('input').first().type(getRandomNumber(100000000000, 999999999999))
    this.getCy('slave-id').type(getRandomNumber(1, 254))
    this.getCy('submit-btn').click()
    cy.intercept('POST', `https://dev.youdera.com/api/${deviceType}/*/communication/test`, (req) => {
      req.body = {
        k: testKey
      }
    }).as(`${deviceType}-communication-test`)
    cy.wait(`@${deviceType}-communication-test`)

    this.getCy('submit-btn').should('contain', 'Complete')

    this.getCy('submit-btn').click()

    return this
  }

  next() {
    this.getCy('footer-button-1').click()
    return new TestPage()
  }
}

export default DevicesPage
