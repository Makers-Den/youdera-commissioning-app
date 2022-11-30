import AbstractPage from "./abstract.page"
import SelectGatewayPage from "./electrician/select-gateway.page"
import NavbarComponent from "./navbar.component"
import SelectModulePage from "./select-module.page"

class SelectProjectPage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Select project')
    this.navbar = new NavbarComponent()
  }

  selectProjectAsRoofer() {
    this.getCy('project').last().click()
    return new SelectModulePage()
  }

  selectProjectAsElectrician() {
    this.getCy('project').last().click()
    return new SelectGatewayPage()
  }
}

export default SelectProjectPage
