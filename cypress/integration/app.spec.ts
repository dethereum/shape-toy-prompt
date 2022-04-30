describe("The App", () => {
  it("selects a circle on click of circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    cy.compareSnapshot("circle drawn", { errorThreshold: 0.05 });
  });

  it("selects a rect on click of rect", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(40, 50);

    cy.compareSnapshot("rect drawn", { errorThreshold: 0.05 });
  });

  it("highlights a rect on hover of rect", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(40, 50);

    cy.compareSnapshot("rect highlight", { errorThreshold: 0.05 });
  });

  it("does not highlight again on rehover of rect", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(40, 50);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(45, 55);

    cy.compareSnapshot("rect highlight double move", { errorThreshold: 0.05 });
  });

  it("highlights a circle on hover of circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(75, 75);

    cy.compareSnapshot("circle highlight", { errorThreshold: 0.05 });
  });

  it("does not highlight again on rehover of circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(75, 75);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).realMouseMove(80, 80);

    cy.compareSnapshot("circle highlight double move", {
      errorThreshold: 0.05,
    });
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

    cy.compareSnapshot("circle hover away", { errorThreshold: 0.05 });
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

    cy.compareSnapshot("rectangle hover", { errorThreshold: 0.05 });
  });

  it("deselects rectangle when clicking selected rectangle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(40, 50);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(40, 50);

    cy.compareSnapshot("rectangle deselect", { errorThreshold: 0.05 });
  });

  it("deselects circle when clicking selected circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    cy.compareSnapshot("circle deselect", { errorThreshold: 0.05 });
  });

  it("deselects circle when clicking outside of selected circle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(300, 300);

    cy.compareSnapshot("circle canvas deselect", { errorThreshold: 0.05 });
  });

  it("deselects rectangle when clicking outside of selected rectangle", () => {
    cy.visit("http://localhost:3000");
    cy.findByRole("button", { name: /add rectangle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(40, 50);

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(300, 300);

    cy.compareSnapshot("rectangle canvas deselect", { errorThreshold: 0.05 });
  });
});
