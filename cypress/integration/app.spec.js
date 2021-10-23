describe("WachMovies", () => {
  it("should navigate to the login page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
  });
  it("should get api data", () => {
    // Start from the index page
    cy.get(".wrapper>.item").children().should("have.length");
  });
});
