import AbstractPage from "./abstract.page"
import NavbarComponent from "./navbar.component"
import SelectModulePage from "./select-module.page"

class SelectProjectPage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Select project')
    this.navbar = new NavbarComponent()
  }

  selectProject() {
    this.getCy('project').last().click()
    return new SelectModulePage()
  }
}

export default SelectProjectPage
