import AbstractPage from "./abstract.page"
import NavbarComponent from "./navbar.component"
import SelectProjectPage from "./select-project.page"

class StringLayoutPage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('String layout')
    this.navbar = new NavbarComponent()
  }

}

export default StringLayoutPage
