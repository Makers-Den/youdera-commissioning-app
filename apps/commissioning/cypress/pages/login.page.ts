// import { User } from "../builders/user.builder"
import { User } from "../fixtures/credentials"
import AbstractPage from "./abstract.page"
import SelectTaskPage from "./select-task.page"
import SelectTask from "./select-task.page"

class LoginPage extends AbstractPage {
  visit() {
    cy.visit("/login")
    return this
  }

  login(user: User) {
    this.getCy("email").type(user.email)
    this.getCy("password").type(user.password)
    this.getCy("remember").click()
    this.getCy("login").click()

    return new SelectTaskPage()
  }

  checkIfLogout() {
    this.checkPathname("/login")
    this.getCy("login")
  }
}

export default LoginPage
