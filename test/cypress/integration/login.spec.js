/// <reference types="cypress" />

describe('Login de donar', () => {
    beforeEach(() => {
      cy.visit('https://donar-front.herokuapp.com');
    });
 

    it('Login Incorrecto', () => {
    cy.get('.links > [href="#/iniciarSesion"]').click()
      logeando('incorrecto@hotmail.com', 'asdadasd');
      cy.get('.py-4 > .btn').click()
    });
    
    it('Login Correcto', () => {
        cy.get('.links > [href="#/iniciarSesion"]').click()
          logeando('santiago4', 'santiago4');
          cy.get('.py-4 > .btn').click()
        });

      it('Login google', () => {
        cy.get('.links > [href="#/iniciarSesion"]').click()
        cy.get('.btn-google').click()
        //logeando ('');
    });

    it('Olvido de contraseña', () => {
        cy.get('.links > [href="#/iniciarSesion"]').click()
        cy.get('.card-footer > .tw-text-sm > a').click()
        //logeando ('');
    });

     

  /*

    it('Login Correcto - SIN Funcion', () => {
      cy.get('#email').type('email@asd.com');
      cy.get('#pass').type('asdasd');
      cy.get('#loginbutton').click();
      cy.get('.byvelhso > :nth-child(5) > :nth-child(1) > .oajrlxb2');
    });
  
  it('Login incorrecto - con Funcion', () => {
    logeando('asdasdasdasdasdasasdasdasdsadasdasdsadasdasdasdasdadsaaasdasdasdasasdasa@hotmail.com', 'xxqsaxa.6F');
    cy.get('._4rbf').contains(mensajeError);
  });
  
    it('Usuario incorrecto - SIN Funcion', () => {
      cy.get('#email').type('sdasdas');
      cy.get('#pass').type('asdasdas');
      cy.get('#loginbutton').click();
      cy.get('._4rbf').contains(mensajeError);
    }); 
    */
  });
  
  function logeando(email, password) {
    cy.get('#userLogin').type(email);
    cy.get('#passLogin').type(password);
    cy.get('.py-4 > .btn').click();
  }
  