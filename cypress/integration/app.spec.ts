describe("The App", () => {
  it("highlights a circle on click of circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    cy.compareSnapshot("circle drawn", { errorThreshold: 0.1 });
  });

  it("highlights a rect on click of rect", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(40, 50);

    cy.compareSnapshot("rect drawn", { errorThreshold: 0.1 });
  });
});
