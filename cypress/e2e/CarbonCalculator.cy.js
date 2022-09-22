describe('Valid Scenarios ', () => {
  beforeEach(() => {
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/')
})  
  it('Verify that I am redirected to the forms page when I enter the asked information', () => {
  })

  it('Verify that I can enter the information manually ', () => {
  })

  it('Verify that I can enter the information by clicking the arrows ', () => {
  })
  
  it('Verify that I can click on the link inside About ', () => {
  })

  it('Verify that I can click on the link inside the How To about fuel economy ', () => {
  })

  it('Verify that I can click on the link inside How To about How to Calculate Your MPG', () => {
  })

  it('Verify that I can download the excel spreadsheet that is provided', () => {
  })

  it('Verify that I can download the excel spreadsheet that is provided', () => {
  })
})

describe('Invalid Scenarios ', () => {
  beforeEach(() => {
    cy.visit('https://www3.epa.gov/carbon-footprint-calculator/')
})  
  it('Verify that I am not redirected to the forms page without entering any information', () => {
  })

  it('Verify that if I enter an invalid number of people, I get a error message', () => {
  })  

  it('Verify that if I enter an invalid ZIP code, I get a error message', () => {
  })

  it('Verify that if I enter an invalid ZIP code and give a check inside the error message, Ill be redirected to the forms page', () => {
  })
})
