import { getRandomEmail, getRandomName, getRandomSurname } from "../utils/generateRandomData";
import AbstractPage from "./abstract.page"

class FormUserSettingsComponent extends AbstractPage {
	constructor() {
		super()
	}
	//TODO: General Details, change password, change avatar

	editGeneralDetails() {
		const name = getRandomName()
		const surname = getRandomSurname()
		const email = getRandomEmail()
		this.getCy('name').type(name);
		this.getCy('surname').type(surname);
		this.getCy('save-general-details').click()
		// this.getCy('email').type(email); //!uncomment for futher testing
	}

}
export default FormUserSettingsComponent
