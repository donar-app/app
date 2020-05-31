/// <reference types="cypress" />

describe('Login de donar', () => {
    beforeEach(() => {
      cy.visit('https://donar-front.herokuapp.com');
    });
 

    it('Login Correcto - con Funcion', () => {
      logeandoFB('correcto@hotmail.com', 'asdadasd');
      cy.get('.byvelhso > :nth-child(5) > :nth-child(1) > .oajrlxb2');
    });
  

    it('Login Correcto - SIN Funcion', () => {
      cy.get('#email').type('email@asd.com');
      cy.get('#pass').type('asdasd');
      cy.get('#loginbutton').click();
      cy.get('.byvelhso > :nth-child(5) > :nth-child(1) > .oajrlxb2');
    });
  
  it('Login incorrecto - con Funcion', () => {
    logeandoFB('asdasdasdasdasdasasdasdasdsadasdasdsadasdasdasdasdadsaaasdasdasdasasdasa@hotmail.com', 'xxqsaxa.6F');
    cy.get('._4rbf').contains(mensajeError);
  });
  
    it('Usuario incorrecto - SIN Funcion', () => {
      cy.get('#email').type('sdasdas');
      cy.get('#pass').type('asdasdas');
      cy.get('#loginbutton').click();
      cy.get('._4rbf').contains(mensajeError);
    });
  });
  
  function logeandoFB(email, password) {
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.get('#loginbutton').click();
  }
  