/// <reference types="cypress" />

const getDataTest = (name) => {
  return `[data-testid=${name}]`;
};
describe("Visit", () => {
  it("Visit Page Check Loader", () => {
    cy.intercept({ method: "GET", url: "https://api.brandnudge-platform.com/admin/brands" }).as("getAllBrands");
    cy.intercept({ method: "GET", url: "https://api.brandnudge-platform.com/admin/manufacturers" }).as("getAllManufacturers");
    cy.intercept({
      method: "POST",
      url: "https://api.brandnudge-platform.com/auth/login/admin",
    }).as("dataGetFirst");
    cy.visit("http://localhost:3000");
    cy.get(getDataTest("emailInput")).type("mohsin@brandnudge.co.uk");
    cy.get(getDataTest("passwordInput")).type("Rabiya25267292@");
    cy.get(getDataTest("signInButton")).click();

    cy.wait("@dataGetFirst").its("response.statusCode").should("equal", 200);
    cy.visit("http://localhost:3000/manufacturers?page=0&perPage=10");
    cy.url().should("include", "/manufacturers?page=0&perPage=10");
    cy.get(getDataTest("loaders")).should("exist");
    cy.wait("@getAllBrands").its("response.statusCode").should("equal", 200);
    cy.wait("@getAllManufacturers").its("response.statusCode").should("equal", 200);
    cy.get(getDataTest("loaders")).should("not.exist");
  });

  it("Check Title , Search and Test Manufacture Create Form And Check its Elements", () => {
    cy.get(".item-title").should("exist");
    cy.contains("Create Manufacturer").should("exist");
    cy.contains("Create Manufacturer").click();
    cy.get(getDataTest("name")).should("exist");
    cy.get(getDataTest("color")).should("exist");
    cy.get(getDataTest("brands")).should("exist");
    cy.contains("Cancel").should("exist");
    cy.contains("Submit").should("exist");
  });
  it("Test Manufacture Create Page And Check Elements", () => {
    cy.get(getDataTest("name")).type("Manufacturer Name");
    cy.get(getDataTest("color")).type("Red");
    cy.get(getDataTest("brands")).type("1001{enter}{Esc}");
    cy.contains("Cancel").click();
  });

  it("Test Manufacture Table Columns", () => {
    cy.get("table").within(() => {
      cy.get("tr").within(() => {
        cy.contains("Edit").should("exist");
        cy.contains("Name").should("exist");
        cy.contains("Brand").should("exist");
        cy.contains("Color").should("exist");
        cy.contains("Date Created").should("exist");
      });
    });
  });
  it("Test Edit Form", () => {
    cy.get("tbody>tr").eq(1).contains("Edit").click();
    cy.get(getDataTest("name")).should("exist");
    cy.get(getDataTest("color")).should("exist");
    cy.contains("Cancel").should("exist");
    cy.contains("Cancel").click();
  });
  // cy.get("tbody>tr").eq(0).get("tr>td").eq(2).click();
});
