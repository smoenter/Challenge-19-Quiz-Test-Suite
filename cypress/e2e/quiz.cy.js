describe('Tech Quiz - End-to-End Flow', () => {
    it('should complete the quiz and display the score', () => {
      cy.visit('/'); // Navigate to the home page
      cy.wait(2000);  // Wait for 2 seconds
      cy.get('button.btn.btn-success.btn-lg').should('be.visible').contains('Start Quiz').click(); // Start the quiz
  
      // Answer all 10 questions
      for (let i = 0; i < 10; i++) {
        cy.get('.answer-button').first().click(); // Select the first answer
      }
  
      cy.get('.score').should('exist'); // Ensure the score is displayed
      cy.get('.score').should('contain', 'Your Score:'); // Check that the score contains text like "Your Score:"
    });
  
    it('should allow the user to start a new quiz', () => {
      cy.visit('/');
      cy.get('button').contains('Start Quiz').click();
      
      for (let i = 0; i < 10; i++) {
        cy.get('.answer-button').first().click(); // Answer all questions
      }
  
      cy.get('.restart-button').click(); // Click the restart button
  
      cy.get('.question').should('exist'); // Check if the quiz restarts
    });
  });
  