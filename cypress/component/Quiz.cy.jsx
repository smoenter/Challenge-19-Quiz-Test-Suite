import { mount } from 'cypress/react18';


describe('Quiz Component', () => {
    it('renders and allows the user to start the quiz', () => {
      cy.mount(<Quiz />); // Mount the Quiz component
  
      cy.get('button').contains('Start Quiz').click(); // Simulate starting the quiz
  
      cy.get('.question').should('exist'); // Check if a question is displayed
    });
  
    it('advances to the next question when answered', () => {
      cy.mount(<Quiz />);
      
      cy.get('button').contains('Start Quiz').click();
      
      cy.get('.answer-button').first().click(); // Simulate answering the first question
      cy.get('.question').should('not.have.text', 'Question 1'); // Check if next question appears
    });
  });
  