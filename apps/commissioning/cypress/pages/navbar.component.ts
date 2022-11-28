import AbstractPage from './abstract.page';
import LoginPage from './login.page';
import SettingsPage from './settings.page';

class NavbarComponent extends AbstractPage {
  constructor() {
    super();
    this.getCy('navbar').should('be.visible');
  }

  openUserSettings() {
    this.getCy('profile-dropdown').click();
    this.getCy('settings').click();
    return new SettingsPage()
  }

  logout() {
    this.getCy('profile-dropdown').click();
    this.getCy('logout').click();

    return new LoginPage()
  }
}

export default NavbarComponent;
