import AbstractPage from "./abstract.page"
import FormUserSettingsComponent from "./form-user-settings.component"
import NavbarComponent from "./navbar.component"

class SettingsPage extends AbstractPage {
	navbar: NavbarComponent
	form: FormUserSettingsComponent
	constructor() {
		super()
		this.assertPageContent('General details')
		this.navbar = new NavbarComponent()
	}
}

export default SettingsPage
