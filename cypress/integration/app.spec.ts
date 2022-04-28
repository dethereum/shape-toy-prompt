describe("The App", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000"); // change URL to match your dev URL
  });

  it("highlights a circle on click of circle", () => {
    cy.visit("http://localhost:3000"); // change URL to match your dev URL
    cy.findByRole("button", { name: /add circle/i }).click();

    cy.findByRole("img", {
      name: /draw shapes here/i,
    }).click(75, 75);

    /*     
    cy.compareSnapshot("circle highlight", {
      capture: "fullPage",
    }); 
    */
  });
});
