/// <reference types="cypress" />

describe('Registro de donar', () => {
    beforeEach(() => {
        cy.visit('https://donar-front.herokuapp.com');
      });

    it('registrar correcto', () => {
        cy.get('.links > [href="#/registrarse"]').click()
      registro('sdas', 'sdas', 'sdas','sdas','argentina', 'buenos aires');
      cy.get('.py-4 > .btn')
    });

    it('registrar incorrecto', () => {
        cy.get('.links > [href="#/registrarse"]').click()
      registro('Ana', 'Diaz', 'anadiaz@hotmail.com','ana00','argentina', 'buenos aires');
      cy.get('.py-4 > .btn')
    });

    it('registrar con google', () => {
        cy.get('.links > [href="#/registrarse"]').click()
      cy.get('.btn-google').click()
    });

});

function registro(nombre, apellido, email, alias, pais, ciudad) {
    cy.get('#nameRegister').type(nombre);
    cy.get('#lastNameRegister').type(apellido);
    cy.get('#emailRegister').type(email);
    cy.get('#userRegister').type(alias);
    cy.get('#countryRegister').type(pais);
    cy.get('#cityRegister').type(ciudad);
    cy.get('.py-4 > .btn').click();
  }
  





