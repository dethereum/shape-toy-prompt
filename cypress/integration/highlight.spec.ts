describe("highlight", () => {
  describe("circle", () => {
    it("highlights on hover", () => {
      cy.visit("http://localhost:3000");
      cy.findByRole("button", { name: /add circle/i }).click();

      cy.findByRole("img", {
        name: /draw shapes here/i,
      }).realMouseMove(75, 75);

      cy.compareSnapshot("circle highlight", { errorThreshold: 0.05 });
    });

    it("does not highlight again on rehover", () => {
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
  });

  describe("rectangle", () => {
    it("highlights on hover", () => {
      cy.visit("http://localhost:3000");
      cy.findByRole("button", { name: /add rectangle/i }).click();

      cy.findByRole("img", {
        name: /draw shapes here/i,
      }).realMouseMove(40, 50);

      cy.compareSnapshot("rect highlight", { errorThreshold: 0.05 });
    });

    it("does not highlight again on rehover", () => {
      cy.visit("http://localhost:3000");
      cy.findByRole("button", { name: /add rectangle/i }).click();

      cy.findByRole("img", {
        name: /draw shapes here/i,
      }).realMouseMove(40, 50);

      cy.findByRole("img", {
        name: /draw shapes here/i,
      }).realMouseMove(45, 55);

      cy.compareSnapshot("rect highlight double move", {
        errorThreshold: 0.05,
      });
    });
  });
});
