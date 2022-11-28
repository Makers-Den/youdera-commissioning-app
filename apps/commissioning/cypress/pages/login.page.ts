import { User } from "../builders/user.builder"
import AbstractPage from "./abstract.page"
import SelectTask from "./select-task.page"
// import HomePage from "./home.page"

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

    return new SelectTask()
  }

  // headlessLogin(user: User) {
  //   const { email, password } = user

  //   this.getCy("main").should("contain", "LOGIN")

  //   cy.getCookie("pink-ad-tool_sAntiCsrfToken").then((cookie) => {
  //     const cookieValue = cookie ? cookie.value : null
  //     const headers = cookieValue
  //       ? {
  //         "anti-csrf": cookieValue,
  //       }
  //       : null

  //     // @ts-ignore
  //     cy.request({
  //       method: "POST",
  //       url: `/api/rpc/login`,
  //       body: {
  //         params: {
  //           email,
  //           password,
  //         },
  //       },
  //       headers,
  //     })
  //   })

  //   cy.visit("/")

  //   return new HomePage()
  // }

  checkIfLogout() {
    this.checkPathname("/login")
    this.getCy("login")
  }
}

export default LoginPage
