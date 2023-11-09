describe("Loggin test", () => {
  it("log in with wrong user test, landing on error page", () => {
    cy.visit("https://workflowkj.netlify.app/");

    cy.scrollTo(0, 500);

    cy.get("button.login").click();

    cy.get("#email").click();
    cy.get("#email").clear().type("KJ@stud.noroff.no");
    cy.get("button").click();
  });
});
