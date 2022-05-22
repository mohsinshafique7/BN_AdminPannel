/// <reference types="cypress" />

const getDataTest = (name) => {
  return `[data-testid=${name}]`;
};
describe("Visit", () => {
  it.only("Visit", () => {
    cy.visit("http://localhost:3000");
  });
  it("Check Elements", () => {
    cy.get(getDataTest("signInLogo")).should("exist");
    cy.get(getDataTest("signInTitle")).should("exist");
    cy.get(getDataTest("emailInput")).should("exist");
    cy.get(getDataTest("passwordInput")).should("exist");
    cy.get(getDataTest("signInButton")).should("exist");
  });
  it.only("Check Sign In With Right Username Password", () => {
    cy.get(getDataTest("emailInput")).type("mohsin@brandnudge.co.uk");
    cy.get(getDataTest("passwordInput")).type("Rabiya25267292@");
    cy.get(getDataTest("signInButton")).click();
    cy.intercept({
      method: "POST",
      url: "https://api.brandnudge-platform.com/auth/login/admin",
    }).as("dataGetFirst");

    cy.wait("@dataGetFirst").its("response.statusCode").should("equal", 200);
    cy.url().should("include", "/users?company=&page=0&perPage=10");
  });
  it("Check Sign In With Wrong Username Password", () => {
    cy.get(getDataTest("emailInput")).type("mohsin@brandnudge.co.uk");
    cy.get(getDataTest("passwordInput")).type("Rabiya25267292");
    cy.get(getDataTest("signInButton")).click();
    cy.intercept({
      method: "POST",
      url: "https://api.brandnudge-platform.com/auth/login/admin",
    }).as("dataGetFirst");

    cy.wait("@dataGetFirst").its("response.statusCode").should("equal", 404);
    cy.get(getDataTest("signInError")).should("exist");
  });
  //   it("Visit", () => {

  //     // cy.url().should('include','/desriredUrl') ----confirm Url
  //     //cy.go('back')----go Back
  //     //cy.log("") -----cypress logs

  //
  //     cy.url().should("include", "/users?company=&page=0&perPage=10");

  //     // Give an alias to request

  //     // Visit site
  //     cy.contains("Subscriptions").click();

  //     // Wait for response.status to be 200
  //     cy.get(getDataTest("loaders")).should("exist");
  //     cy.wait("@dataGetFirst").its("response.statusCode").should("equal", 200);
  //     cy.get(getDataTest("loaders")).should("not.exist");
  //   });
});
