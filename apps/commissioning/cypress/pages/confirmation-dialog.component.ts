import AbstractPage from './abstract.page';
import LoginPage from './login.page';
import SettingsPage from './settings.page';

class ConfirmationDialog<T> extends AbstractPage {
  pageToRedirect: new () => T;
  afterConfirmationAction: () => void;

  constructor(pageToRedirect = undefined, afterConfirmationAction = () => undefined) {
    super();
    this.pageToRedirect = pageToRedirect
    this.afterConfirmationAction = afterConfirmationAction
  }
  confirm() {
    this.getCy('confirmation-confirm-button').click()
    this.afterConfirmationAction()
    if (this.pageToRedirect) return new this.pageToRedirect()
  }
  decline() {
    this.getCy('confirmation-decline-button')
    return new this.pageToRedirect()
  }
}

export default ConfirmationDialog;
