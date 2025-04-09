describe('Tech Quiz - End-to-End Flow', () => {
  beforeEach(() => {
    // Intercept API call for questions
    cy.intercept('GET', '/api/questions/random', (req) => {
      cy.log('Intercepted API call');
      req.reply({ fixture: 'questions.json' });
    }).as('getQuestions');
  });

  it('should complete the quiz and display the score', () => {
    cy.visit('/'); // Navigate to the home page
    cy.wait('@getQuestions').should('have.property', 'response'); // Wait for API request to complete

    // Start the quiz
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Ensure API response is received after starting quiz

    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      cy.get('.answer-button').first().click(); // Select the first answer
      cy.get('button').click().parent(); // Proceed to the next question
    }

    // verify the score is displayed
    cy.get('.score').should('exist'); // Ensure the score is displayed
    cy.get('.score').should('contain', 'Your Score:'); // Check that the score contains text like "Your Score:"
  });

  it('should allow the user to start a new quiz', () => {
    cy.visit('/'); // Navigate to the home page
    cy.wait('@getQuestions'); // Wait for the initial API response

    // Ensure the "Start Quiz" button is visible and click it
    cy.contains('button', 'Start Quiz').should('be.visible').click(); // Use a more flexible selector

    // Wait for the API response after starting the quiz
    cy.wait('@getQuestions').should('have.property', 'response'); // Wait for the question API

    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      cy.get('.answer-button').should('exist').first().click(); // Answer all questions
    }

    // Wait for the quiz to finish and make sure the restart button is visible
    cy.get('.restart-button').should('be.visible').click(); // Click the restart button

    // Ensure the quiz restarts and new question appears
    cy.get('.question').should('exist'); // Check if the quiz restarts and the question appears again
  });
});


