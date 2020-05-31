/// <reference types="cypress" />
describe('publicar', () => {

    beforeEach(() => {
        cy.visit('https://donar-front.herokuapp.com');
      });

      it('donarSin logear', () => {
        cy.get('.links > [href="#/publicar"]').click()
        cy.get(':nth-child(1) > .tw-text-lg').click()
        publicar('zapatos rojos','Ropa','son unos zapatos rojos que', 'puedo entregar en palermo' )
        cy.get('.bg-orange-donar').click();
    });

    it('solicitarSin logear', () => {
      cy.get('.links > [href="#/publicar"]').click()
      cy.get(':nth-child(2) > .tw-text-lg').click()
      publicar('zapatos rojos','Ropa','son unos zapatos rojos que', 'puedo entregar en palermo' )
      cy.get('.bg-blue-donar').click();
  });
    
});

      /*  cy.get('select.tw-appearance-none').click();
        cy.get('input.tw-px-4').click() //subir archivo
        });

        */

    function publicar (titulo, categoria, descripcionProducto, descripcionEnvio,) {
    cy.get('.tw-px-3').type(titulo);
    cy.get('select.tw-appearance-none').select(categoria)
    cy.get('[placeholder="Descripcion del producto"]').type(descripcionProducto);
    cy.get('[placeholder="Descripcion de envio"]').type(descripcionEnvio);
  }

  


