import AbstractPage from "./abstract.page"
import ConfirmationDialog from "./confirmation-dialog.component"
import NavbarComponent from "./navbar.component"
import StringLayoutPage from "./string-layouts.page"

class ModuleFieldsPage extends AbstractPage {
  navbar: NavbarComponent

  constructor() {
    super()
    this.assertPageContent('Module Fields')
    this.navbar = new NavbarComponent()
  }
  // Put this into component
  modifyProperties() {
    //TODO
    this.getCy('module-0').click()
    return this
  }

  modifyStrings() {
    //TODO
    this.getCy('module-0').click()
    return
  }

  deleteModuleField() {
    //TODO
    this.getCy('module-0').click()
    return this
  }

  //
  next() {
    this.getCy('footer-button-1').click()
    return new ConfirmationDialog<StringLayoutPage>(StringLayoutPage)
  }

}

export default ModuleFieldsPage
