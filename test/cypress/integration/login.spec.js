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
          logeando('asd', 'asd');
          cy.get('.py-4 > .btn').click()
        });

      /* it('Login google', () => {
        cy.get('.links > [href="#/iniciarSesion"]').click()
        cy.get('.btn-google').click()
        //logeando ('');
    });
*/
    it('Olvido de contraseña', () => {
        cy.get('.links > [href="#/iniciarSesion"]').click()
        cy.get('.card-footer > .tw-text-sm > a').click()
 
    });

     
  });
  
  function logeando(usuario, password) {
    cy.get('#userLogin').type(usuario);
    cy.get('#passLogin').type(password);
    cy.get('.py-4 > .btn').click();
  }
  