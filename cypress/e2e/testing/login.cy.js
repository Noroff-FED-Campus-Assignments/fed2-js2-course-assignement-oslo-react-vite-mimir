describe("Log in", () => {
  it("log in and landing on the profile page", () => {
    cy.visit("https://workflowkj.netlify.app/");

    cy.scrollTo(0, 500);

    cy.get("button.login").click();

    cy.get("button").click();

    cy.get('img[alt="User Avatar"]').click();
  });
});
