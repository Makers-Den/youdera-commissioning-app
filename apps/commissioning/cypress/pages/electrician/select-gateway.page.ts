import AbstractPage from "../abstract.page"
import ModuleFieldsPage from "../module-fields.page"
import NavbarComponent from "../navbar.component"
import DevicesPage from "./devices.page"

class SelectGatewayPage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Select gateway')
    this.navbar = new NavbarComponent()
  }

  selectGateway() {
    this.getCy('gateway').last().click()
    return new DevicesPage()
  }
}

export default SelectGatewayPage
