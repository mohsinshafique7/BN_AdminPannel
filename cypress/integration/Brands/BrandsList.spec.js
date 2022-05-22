/// <reference types="cypress" />

const getDataTest = (name) => {
  return `[data-testid=${name}]`;
};
describe("Visit", () => {
  it.only("Visit Page Check Loader", () => {
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
    cy.visit("http://localhost:3000/brands?page=0&perPage=10");
    cy.url().should("include", "/brands?page=0&perPage=10");
    cy.get(getDataTest("loaders")).should("exist");
    cy.wait("@getAllBrands").its("response.statusCode").should("equal", 200);
    cy.wait("@getAllManufacturers").its("response.statusCode").should("equal", 200);
    cy.get(getDataTest("loaders")).should("not.exist");
  });

  it.only("Check Title , Search and Test Brands Create Form And Check its Elements", () => {
    cy.get(".item-title").should("exist");
    cy.contains("Create Brand").should("exist");
    cy.contains("Create Brand").click();
    cy.get(getDataTest("name")).should("exist");
    cy.get(getDataTest("color")).should("exist");
    cy.get(getDataTest("manufacturerId")).should("exist");
    cy.get(getDataTest("brandId")).should("exist");
    cy.contains("Cancel").should("exist");
    cy.contains("Submit").should("exist");
  });
  it.only("Test Brand Create Page And Check Elements", () => {
    cy.get(getDataTest("name")).type("Brand Name");
    cy.get(getDataTest("color")).type("Red");
    cy.get(getDataTest("manufacturerId")).type("asda{enter}");
    cy.get(getDataTest("brandId")).type("asda{enter}");
    cy.contains("Cancel").click();
  });

  it.only("Test Manufacture Table Columns", () => {
    cy.get("table").within(() => {
      cy.get("tr").within(() => {
        cy.contains("Edit").should("exist");
        cy.contains("Name").should("exist");
        cy.contains("Manufacturer").should("exist");
        cy.contains("Color").should("exist");
        cy.contains("Product Count").should("exist");
        cy.contains("Date Created").should("exist");
      });
    });
  });
  it.only("Test Edit Form", () => {
    cy.get("tbody>tr").eq(1).contains("Edit").click();
    cy.get(getDataTest("name")).should("exist");
    cy.get(getDataTest("color")).should("exist");
    cy.get(getDataTest("manufacturerId")).should("exist");
    cy.get(getDataTest("brandId")).should("exist");
    cy.contains("Cancel").should("exist");
    cy.contains("Submit").should("exist");
  });
  // cy.get("tbody>tr").eq(0).get("tr>td").eq(2).click();
});
