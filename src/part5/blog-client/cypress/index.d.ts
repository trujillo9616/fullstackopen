declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
    clickButton(text: string): Chainable<void>;
    createBlogPost(title: string, url: string): Chainable<void>;
    resetLocalStorage(): Chainable<void>;
  }
}
