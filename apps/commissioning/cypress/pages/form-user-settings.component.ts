import AbstractPage from "./abstract.page"

class FormUserSettingsComponent extends AbstractPage {
	constructor() {
		super()
	}

	editGeneralDetails() {
		this.getCy('name');
		this.getCy('surname');
		// this.getCy('email');
	}

}
export default FormUserSettingsComponent
