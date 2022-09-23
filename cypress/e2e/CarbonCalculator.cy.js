describe('Valid Scenarios ', () => {
  beforeEach(() => {
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/')
})  
  it('Verify that I am redirected to the forms page when I enter the asked information', () => {
    cy.get('#ppl-in-household-input')
      .should('be.visible')
      .type('1')
    
    cy.get('#zip-code-input')
      .should('be.visible')
      .type('12345')

    cy.contains('button', 'Get Started').click()
    cy.get('.eps-header-info > h2', { timeout: 10000 }).should('be.visible')
  })

  it('Verify that I can click on the link inside About ', () => {
    cy.get('span > .bold-n-blue')
      .should('be.visible')
      .invoke('removeAttr', 'target') 
      .click()
  })

  it('Verify that I can download the excel spreadsheet that is provided', () => {
    cy.contains('Calculator in Excel').click()
    cy.readFile('cypress/downloads/GHGCalculator.xls').should('exist')
  })

  it('Verify that I am after filling in all the data, generates a report', () => {
    cy.get('#ppl-in-household-input')
      .should('be.visible')
      .type('1')
    
    cy.get('#zip-code-input')
      .should('be.visible')
      .type('12345')

    cy.contains('button', 'Get Started').click()
    cy.get('.eps-header-info > h2', { timeout: 10000 }).should('be.visible')

    cy.get('#primaryHeatingSource').should('be.visible')
    cy.get('#primaryHeatingSource').select('Natural Gas')
    cy.get('#naturalGasTextInput').type('1')
    cy.get('#electricityTextInput').type('1')
    cy.get('#fuelTextInput').type('1')
    cy.get('#propaneTextInput').type('1')
    cy.get('#energyAC').type('100')
    cy.get('#energyHeat').type('10')
    cy.get('#lightsToReplace').type('1')
    cy.get('#pwrMgmtSelect').select('Will Do')
    cy.get('#increaseGreenInput').type('1')
    cy.get('#coldWaterSelect').select('Will Not Do')
    cy.get('#loadsPerWeek').type('1')
    cy.get('#AirDrySelect').select('Already Done')
    cy.get('#fridgeSelect').select('Already Done')
    cy.get('#furnaceSelect').select('Already Done')
    cy.get('#windowSelect').select('Already Done')
    cy.get('#to-transportation').click()

    cy.get('#numVehiclesInput').select('1')
    cy.get('#maintCurrentSelect').select('Already Done')
    cy.get('#vehicle1Miles').type('2')
    cy.get('#vehicle1Select').select('Per Year')
    cy.get('#vehicle1GasMileage').type('3')
    cy.get('#reduceMilesInput1').type('4')
    cy.get('#replaceVehicleInput1').type('5')
    cy.get('#to-waste').click() 

    cy.get('#aluminumCheckbox').check()
    cy.get('#wasteReductionRadios > :nth-child(1) > label').should('not.be.visible')
    cy.get('#plasticCheckboxR').check()
    cy.get('#to-report').click()

    cy.get('#homeEnergyProgressBar').should('have.value', 100)
    cy.get('#transportationProgressBar').should('have.value', 100)
    cy.get('#wasteProgressBar').should('have.value', 100)
    cy.get('#progress-incomplete').should('not.be.visible')
    cy.get('#progress-complete > h2').should('be.visible')
  })

  it('Verify that after not filling in any data within the detail page, it generates a report anyway', () => {
    cy.get('#ppl-in-household-input')
      .should('be.visible')
      .type('1')
    
    cy.get('#zip-code-input')
      .should('be.visible')
      .type('12345')

    cy.contains('button', 'Get Started').click()
    cy.get('.eps-header-info > h2', { timeout: 10000 }).should('be.visible')

    cy.get('#to-transportation').click()
    cy.get('#to-waste').click() 
    cy.get('#to-report').click()

    cy.get('#homeEnergyProgressBar').should('have.value', 0)
    cy.get('#transportationProgressBar').should('have.value', 0)
    cy.get('#wasteProgressBar').should('have.value', 0)
    cy.get('#progress-incomplete').should('be.visible')
    cy.get('#progress-complete > h2').should('not.be.visible')
  })

})

describe('Invalid Scenarios ', () => {
  beforeEach(() => {
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/')
})  
  it('Verify that I am not redirected to the forms page without entering any information', () => {
    cy.get('#ppl-in-household-input')
    .should('be.visible')
  
  cy.get('#zip-code-input')
    .should('be.visible')

  cy.contains('button', 'Get Started').click()
  cy.get('#failValidation').should('be.visible')
  })

  it('Verify that if I enter an invalid number of people, I get a error message', () => {
    cy.get('#ppl-in-household-input')
    .should('be.visible')
    .type('-2')
  
  cy.get('#zip-code-input')
    .should('be.visible')
    .type('12345')

  cy.contains('button', 'Get Started').click()
  cy.get('#invalidNum').should('be.visible')
  })  

  it('Verify that if I enter an invalid ZIP code, I get a error message', () => {
    cy.get('#ppl-in-household-input')
      .should('be.visible')
      .type('2')
  
    cy.get('#zip-code-input')
      .should('be.visible')
      .type('00000')

    cy.contains('button', 'Get Started').click()
    cy.get('#invalidZip', { timeout: 10000 }).should('be.visible')

  })

  it('Verify that if I enter an invalid ZIP code and give a check inside the error message, Ill be redirected to the forms page', () => {
    cy.get('#ppl-in-household-input')
    .should('be.visible')
    .type('2')

  cy.get('#zip-code-input')
    .should('be.visible')
    .type('00000')

  cy.contains('button', 'Get Started').click()
  cy.get('#zipDefault > label', { timeout: 10000 }).should('be.visible')
  cy.get('.default-zip').check()
  cy.contains('button', 'Get Started').click()
  cy.get('.eps-header-info > h2').should('be.visible')

  })
})
