/// <reference types="cypress" />

describe("Authentication flows", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("allows the user to log in and access their profile", () => {
    cy.get('input[name="email"]').type("Mirmir2023@stud.noroff.no");
    cy.get('input[name="password"]').type("Pushing-P");
    cy.get('button[type="submit"]').click();

    cy.get('img[alt="User Avatar"]').click();
    cy.url().should("include", "/profile");
  });

  it("shows an error message when logging in with invalid credentials", () => {
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    /*     cy.get(".error-message").should("be.visible"); // Replace with the selector for your error message
    cy.contains("Invalid credentials"); // Replace with the actual error message text */
  });

  it("allows the user to log out", () => {
    // First log the user in, you can abstract this into a command if repeated across tests
    cy.get('input[name="email"]').type("Mirmir2023@stud.noroff.no");
    cy.get('input[name="password"]').type("Pushing-P");
    cy.get('button[type="submit"]').click();

    // Now log the user out
    cy.get("button#logout").click(); // Use the selector for your logout button

    cy.contains("Login"); // Replace with something unique to your logged-out state
  });
});
