import AbstractPage from "./abstract.page"
import NavbarComponent from "./navbar.component"
import SelectProjectPage from "./select-project.page"

class SelectTaskPage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Select task')
    this.navbar = new NavbarComponent()
  }

  selectComissioning() {
    this.getCy('commissioning').click()
    return new SelectProjectPage()
  }
}

export default SelectTaskPage
