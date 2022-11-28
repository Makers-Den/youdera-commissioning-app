import AbstractPage from "./abstract.page"
import NavbarComponent from "./navbar.component"

class SelectTask extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Select project')
    this.navbar = new NavbarComponent()
  }

  selectComissioning() {
    this.getCy('commissioning')
    return
  }
}

export default SelectTask
