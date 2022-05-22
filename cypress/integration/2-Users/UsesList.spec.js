/// <reference types="cypress" />

const getDataTest = (name) => {
  return `[data-testid=${name}]`;
};
describe("Visit", () => {
  it("Visit Page Check Loader", () => {
    cy.intercept({ method: "GET", url: "https://api.brandnudge-platform.com/companies" }).as("getAllCompanies");
    cy.intercept({ method: "GET", url: "https://api.brandnudge-platform.com/users" }).as("getAllUsers");
    cy.intercept({
      method: "POST",
      url: "https://api.brandnudge-platform.com/auth/login/admin",
    }).as("dataGetFirst");
    cy.visit("http://localhost:3000");
    cy.get(getDataTest("emailInput")).type("mohsin@brandnudge.co.uk");
    cy.get(getDataTest("passwordInput")).type("Rabiya25267292@");
    cy.get(getDataTest("signInButton")).click();

    cy.wait("@dataGetFirst").its("response.statusCode").should("equal", 200);
    cy.url().should("include", "/users?company=&page=0&perPage=10");
    cy.server();
    cy.get(getDataTest("loaders")).should("exist");
    cy.wait("@getAllCompanies").its("response.statusCode").should("equal", 200);
    cy.wait("@getAllUsers").its("response.statusCode").should("equal", 200);
    cy.get(getDataTest("loaders")).should("not.exist");
  });

  it("Check Title , Search and Test User Create Form And Check its Elements", () => {
    cy.get(getDataTest("userListTitle")).should("exist");
    cy.contains("Create User").should("exist");
    cy.contains("Create User").click();
    cy.get(getDataTest("first_name")).should("exist");
    cy.get(getDataTest("last_name")).should("exist");
    cy.get(getDataTest("email")).should("exist");
    cy.get(getDataTest("password")).should("exist");
    cy.get("#core_companyId").should("exist");
    cy.get("#core_status").should("exist");
    cy.get("#core_is_staff").should("exist");
    cy.contains("Cancel").should("exist");
  });
  it("Test User Create Page And Check Elements", () => {
    cy.get(getDataTest("first_name")).type("Test User");
    cy.get(getDataTest("last_name")).type("Test last Name");
    cy.get(getDataTest("email")).type("test@test.co.uk");
    cy.get(getDataTest("password")).type("test@123@asd$");
    cy.get("#core_companyId").type("Brand Nudge{enter}");
    cy.get("#core_status").type("active{enter}");
    cy.get("#core_is_staff").click();
    cy.contains("Cancel").click();
  });

  it("Test User Table Columns", () => {
    cy.get("table").within(() => {
      cy.get("tr").within(() => {
        cy.contains("Edit").should("exist");
        cy.contains("Avatar").should("exist");
        cy.contains("Email").should("exist");
        cy.contains("Status").should("exist");
        cy.contains("Company").should("exist");
        cy.contains("Date Created").should("exist");
      });
    });
  });
  it("Test Edit Form", () => {
    cy.get("tbody>tr").eq(1).contains("Edit").click();
    cy.get(getDataTest("first_name")).should("exist");
    cy.get(getDataTest("last_name")).should("exist");
    cy.get(getDataTest("email")).should("exist");
    cy.get(getDataTest("password")).should("exist");
    cy.get("#core_companyId").should("exist");
    cy.get("#core_status").should("exist");
    cy.get("#core_is_staff").should("exist");
    cy.contains("Cancel").should("exist");
    // cy.contains("Cancel").click();
  });
  // cy.get("tbody>tr").eq(0).get("tr>td").eq(2).click();
});
