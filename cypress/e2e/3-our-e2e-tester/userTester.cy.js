describe("Authentication flows", () => {
  beforeEach(() => {
    cy.visit("https://incredible-cassata-878ab6.netlify.app");
  });
  it("find login btn", () => {
    cy.get('button[type="Login"]').click();
  });

  it("allows the user to log in and access their profile", () => {
    cy.get('input[name="email"]')
      .type("Mirmir2023@stud.noroff.no")
      .should("have.value", "Mirmir2023@stud.noroff.no"); // Use the selector for your email input
    cy.get('input[name="password"]').type("Pushing-P"); // Use the selector for your password input
    cy.get('button[type="submit"]').click(); // Use the selector for your login button

    cy.url().should("include", "/profile"); // Replace with the path to your profile page
    cy.contains("Profile"); // Replace with something unique to your profile page
  });

  it("shows an error message when logging in with invalid credentials", () => {
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    cy.get(".error-message").should("be.visible"); // Replace with the selector for your error message
    cy.contains("Invalid credentials"); // Replace with the actual error message text
  });

  it("allows the user to log out", () => {
    // First log the user in, you can abstract this into a command if repeated across tests
    cy.get('input[name="email"]').type("Mirmir2023@stud.noroff.no");
    cy.get('input[name="password"]').type("Pushing-P");
    cy.get('button[type="submit"]').click();

    // Now log the user out
    cy.get("button#logout").click(); // Use the selector for your logout button

    cy.url().should("not.include", "/profile"); // Assuming logging out redirects away from the profile page
    cy.contains("Sign in"); // Replace with something unique to your logged-out state
  });
});
