import AbstractPage from './abstract.page';
import LoginPage from './login.page';
import SettingsPage from './settings.page';

class ConfirmationDialog<T> extends AbstractPage {
  pageToRedirect: T;

  constructor(pageToRedirect) {
    super();
    this.pageToRedirect = new pageToRedirect() // ! WIP
  }
  confirm() {
    this.getCy('confirmation-confirm-button').click()
    return this.pageToRedirect
  }
  decline() {
    this.getCy('')
    return this.pageToRedirect
  }
}

export default ConfirmationDialog;
