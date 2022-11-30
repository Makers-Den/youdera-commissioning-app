import { getRandomName, getRandomNumber } from '../../utils/generateRandomData';
import AbstractPage from '../abstract.page';
import ConfirmationDialog from '../confirmation-dialog.component';
import NavbarComponent from '../navbar.component';
import StringLayoutPage from './string-layouts.page';

class ModuleFieldsPage extends AbstractPage {
  navbar: NavbarComponent;
  constructor() {
    super();
    this.assertPageContent('Module Fields');
    this.navbar = new NavbarComponent();
  }
  addModuleField() {
    this.getCy('add-module-field-btn').click();
    this.getCy('name').type(getRandomName())
    this.getCy('specific-yield').type(getRandomNumber(10, 1000))
    this.getCy('slant-angle').type(getRandomNumber(1, 90))
    this.getCy('azimut').type(getRandomNumber(1, 359))
    this.getCy('submit-btn').click()
    this.getCy('toast').should('contain', 'Module field added successfully!');
    return this;
  }
  // Put this into component
  modifyProperties() {
    //TODO
    this.getCy('module-0').click();
    return this;
  }

  modifyStrings() {
    //TODO
    this.getCy('module-0').click();
    return;
  }

  deleteModuleField() {
    //TODO
    this.getCy('module-0').click();
    return this;
  }

  //
  next() {
    this.getCy('footer-button-1').click();
    return new ConfirmationDialog<StringLayoutPage>(StringLayoutPage);
  }
}

export default ModuleFieldsPage
