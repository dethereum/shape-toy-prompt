describe("The App", () => {
  it("selects a circle on click of circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    cy.compareSnapshot("circle drawn", { errorThreshold: 0.1 });
  });

  it("selects a rect on click of rect", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(40, 50);

    cy.compareSnapshot("rect drawn", { errorThreshold: 0.1 });
  });

  it("highlights a rect on hover of rect", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(40, 50);

    cy.compareSnapshot("rect highlight", { errorThreshold: 0.1 });
  });

  it("highlights a circle on hover of circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(75, 75);

    cy.compareSnapshot("circle highlight", { errorThreshold: 0.1 });
  });

  it("keeps selected state on circle after hovering away from circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(700, 700);

    cy.compareSnapshot("circle hover away", { errorThreshold: 0.1 });
  });

  it("keeps selected state on rectangle after hovering on rectangle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(40, 50);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(75, 75);

    cy.compareSnapshot("rectangle hover", { errorThreshold: 0.1 });
  });
});
