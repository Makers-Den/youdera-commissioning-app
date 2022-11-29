import AbstractPage from "./abstract.page"
import NavbarComponent from "./navbar.component"
import SelectProjectPage from "./select-project.page"
import SelectTaskPage from "./select-task.page"

class CompletePage extends AbstractPage {
  navbar: NavbarComponent
  constructor() {
    super()
    this.assertPageContent('Project setup was finished')
    this.navbar = new NavbarComponent()
  }

  goToMainMenu() {
    this.getCy('commissioning').click()
    return new SelectTaskPage()
  }
}

export default CompletePage
