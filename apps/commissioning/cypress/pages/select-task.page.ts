import AbstractPage from "./abstract.page"
import NavbarComponent from "./navbar.component"

class SelectTask extends AbstractPage {
	navbar: NavbarComponent
	constructor() {
		super()
		this.assertPageContent('Select task')
		this.navbar = new NavbarComponent()
	}
}

export default SelectTask
