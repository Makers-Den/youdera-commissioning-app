import AbstractPage from "../abstract.page"
import CompletePage from "../complete.page"
import ConfirmationDialog from "../confirmation-dialog.component"
import ModuleFieldsPage from "../roofer/module-fields.page"
import NavbarComponent from "../navbar.component"
import DevicesPage from "./devices.page"

class TestPage extends AbstractPage {
  navbar: NavbarComponent
  confirmationDialog: ConfirmationDialog<undefined>
  constructor() {
    super()
    this.assertPageContent('Test and Verify')
    this.navbar = new NavbarComponent()
    this.confirmationDialog = new ConfirmationDialog()
  }

  testAndVerifyAllDevices() {
    this.getCy('device-0').click()
    this.getCy('device-0-test-btn').click()
    this.confirmationDialog.confirm()
    this.getCy('device-1').click()
    this.getCy('device-1-test-btn').click()
    this.confirmationDialog.confirm()
    this.getCy('device-2').click()
    this.getCy('device-2-test-btn').click()
    this.confirmationDialog.confirm()

    return this
  }

  finish() {
    this.getCy('footer-button-1').click()
    return new CompletePage()
  }
}

export default TestPage
