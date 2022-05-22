/// <reference types="cypress" />

const getDataTest = (name) => {
  return `[data-testid=${name}]`;
};
describe("Visit", () => {
  it.only("Visit Page Check Loader", () => {
    cy.intercept({ method: "GET", url: "https://api.brandnudge-platform.com/admin/subscription/category" }).as("getAllCategories");
    cy.intercept({
      method: "POST",
      url: "https://api.brandnudge-platform.com/auth/login/admin",
    }).as("dataGetFirst");
    cy.visit("http://localhost:3000");
    cy.get(getDataTest("emailInput")).type("mohsin@brandnudge.co.uk");
    cy.get(getDataTest("passwordInput")).type("Rabiya25267292@");
    cy.get(getDataTest("signInButton")).click();

    cy.wait("@dataGetFirst").its("response.statusCode").should("equal", 200);
    cy.visit("http://localhost:3000/categories?page=0&perPage=10");
    cy.url().should("include", "/categories?page=0&perPage=10");
    cy.get(getDataTest("loaders")).should("exist");
    cy.wait("@getAllCategories").its("response.statusCode").should("equal", 200);
    cy.get(getDataTest("loaders")).should("not.exist");
  });

  it.only("Check Title , Search and Test Retailer Create Form And Check its Elements", () => {
    cy.get(".item-title").should("exist");
    cy.contains("Create Category").should("exist");
    cy.contains("Create Category").click();
    cy.get(getDataTest("name")).should("exist");
    cy.get(getDataTest("color")).should("exist");
    cy.get(getDataTest("pricePer")).should("exist");
    cy.get(getDataTest("measurementUnit")).should("exist");
    cy.get(getDataTest("categoryId")).should("exist");
    cy.get("#core_subscription").should("exist");
    cy.contains("Cancel").should("exist");
    cy.contains("Submit").should("exist");
  });
  it.only("Test Retailer Create Page And Check Elements", () => {
    cy.get(getDataTest("name")).type("Category Name");
    cy.get(getDataTest("color")).type("Red");
    cy.get(getDataTest("pricePer")).type("12");
    cy.get(getDataTest("measurementUnit")).type("KG");
    cy.get(getDataTest("categoryId")).type("Fresh{enter}");
    cy.get("#core_subscription").click();
    cy.contains("Cancel").click();
  });

  it.only("Test Retailer Table Columns", () => {
    cy.get("table").within(() => {
      cy.get("tr").within(() => {
        cy.contains("Edit").should("exist");
        cy.contains("Name").should("exist");
        cy.contains("Subscription").should("exist");
        cy.contains("Price Per").should("exist");
        cy.contains("Measurement Unit").should("exist");
        cy.contains("Color").should("exist");
        cy.contains("Date Created").should("exist");
      });
    });
  });
  it.only("Test Edit Form", () => {
    cy.get("tbody>tr").eq(1).contains("Edit").click();
    cy.get(getDataTest("name")).should("exist");
    cy.get(getDataTest("color")).should("exist");
    cy.get(getDataTest("pricePer")).should("exist");
    cy.get(getDataTest("measurementUnit")).should("exist");
    cy.get(getDataTest("categoryId")).should("exist");
    cy.get("#core_subscription").should("exist");
    cy.contains("Cancel").should("exist");
    cy.contains("Submit").should("exist");
  });
  // cy.get("tbody>tr").eq(0).get("tr>td").eq(2).click();
});
