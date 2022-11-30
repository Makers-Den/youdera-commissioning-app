import AbstractPage from "../abstract.page"
import ModuleFieldsPage from "./module-fields.page"
import NavbarComponent from "../navbar.component"

class SelectModulePage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Select main module type')
    this.navbar = new NavbarComponent()
  }

  selectModule() {
    this.getCy('module-0').click()
    return new ModuleFieldsPage()
  }
}

export default SelectModulePage
