describe('Fase 3: Automatización de Interfaz de Usuario (UI) con Cypress - Escenario Fallido', () => {

  beforeEach(() => {
   
    cy.visit('https://cabanapinohuacho.mlarac.cl/reservar', {
      timeout: 30000 
    });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });

  it('Escenario 2 (Manejo de Errores): Intentar avanzar dejando los campos vacíos', () => {
   
    cy.get('#step-1 button, #step-1 input').contains(/continuar|agendar/i).click();

   
    cy.get('body').then(($body) => {
      if ($body.text().includes('obligatorio') || $body.text().includes('seleccione') || $body.text().includes('requerido')) {
        
        cy.wrap($body).should('contain', 'obligatorio');
      } else {
        
        cy.get('#guestName').should('not.be.visible');
      }
    });
  });
});