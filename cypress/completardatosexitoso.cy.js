describe('Fase 3: Automatización de Interfaz de Usuario (UI) con Cypress - Escenario Exitoso', () => {

  beforeEach(() => {
    cy.visit('https://cabanapinohuacho.mlarac.cl/reservar', {
      timeout: 30000 
    });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });

  it('Escenario 1 (Exitoso): Flujo guiado del Wizard de Reserva con datos del usuario', () => {
    
    cy.get('input[type="date"], input[name*="entrada"]').first().type('2029-08-11');
    cy.get('input[type="date"], input[name*="salida"]').last().type('2029-10-11');
    cy.get('select, input[type="number"]').first().select('2', { force: true }).type('2');

    
    cy.get('#step-1 button, #step-1 input').contains(/continuar|agendar/i).click();

    
    cy.get('#guestName').should('be.visible').type('Isai Vargas');
    cy.get('#guestEmail').type('abel.vargas@gmail.com');
    
    
    cy.get('#step-2 input[type="tel"]').type('925801234');

    cy.get('#guestEmail').should('have.value', 'abel.vargas@gmail.com');

    
    cy.get('#step-2 button').contains(/continuar/i).click();

    
    cy.get('#step-3 button, button.btn-success').contains(/confirmar/i).should('be.visible').click();

    
    cy.get('body').should('not.contain', 'El campo es obligatorio');
  });
});