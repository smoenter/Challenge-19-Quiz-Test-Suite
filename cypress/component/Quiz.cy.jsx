import { mount } from 'cypress/react18';
import Quiz from '../component/Quiz';
import React from 'react';

describe('Quiz Component', () => {
  // This runs before each test to mount the component once.
  beforeEach(() => {
    mount(<Quiz />);
  });

  it('renders and allows the user to start the quiz', () => {
    cy.get('button').contains('Start Quiz').click(); // Simulate starting the quiz
    
    // Ensure a question is displayed (use a more specific selector if possible)
    cy.get('.question').should('exist'); 
    cy.get('.question').should('not.have.text', ''); // Ensure the question text is not empty
  });

  it('advances to the next question when answered', () => {
    cy.get('button').contains('Start Quiz').click(); // Start the quiz

    // Simulate answering the first question
    cy.get('.answer-button').first().click(); 

    // Check that the question has advanced
    cy.get('.question').should('not.have.text', 'Question 1'); // Assumes you have 'Question 1' as text for the first question
    cy.get('.question').should('exist'); // Ensure that the next question is displayed
  });

  // Additional test: Check if a score is displayed after finishing the quiz
  it('should display the score after completing all questions', () => {
    cy.get('button').contains('Start Quiz').click();
    
    // Answer all questions (Assuming 10 questions for this example)
    for (let i = 0; i < 10; i++) {
      cy.get('.answer-button').first().click(); // Answer the first button for each question
      cy.wait(500); // Optional: Add a small wait to simulate answering slowly, adjust as needed
    }

    // After answering, check if the score is displayed
    cy.get('.score').should('exist'); // Ensure the score is shown
    cy.get('.score').should('contain', 'Your Score:'); // Check that the score contains the expected text
  });
});