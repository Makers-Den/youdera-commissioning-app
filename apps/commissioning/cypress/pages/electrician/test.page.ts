import AbstractPage from "../abstract.page"
import ModuleFieldsPage from "../module-fields.page"
import NavbarComponent from "../navbar.component"
import DevicesPage from "./devices.page"

class TestPage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Select gateway')
    this.navbar = new NavbarComponent()
  }


}

export default TestPage
