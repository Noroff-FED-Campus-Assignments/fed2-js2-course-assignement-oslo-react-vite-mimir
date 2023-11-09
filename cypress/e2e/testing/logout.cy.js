describe("Log out test", () => {
  it("login out and removing the mock token", () => {
    cy.visit("https://workflowkj.netlify.app/");

    cy.get("button.logout").click();
  });
});
