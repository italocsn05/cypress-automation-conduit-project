/// <reference types="Cypress" />

describe('Conduit application scenarios testing', ()=> {
    context('tests with success result', ()=> {
        const faker = require('faker')
        const userName = faker.internet.userName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        
        beforeEach(()=> {
            cy.visit('/')
        })

        it('CT01 - US01 - A User created with success.', ()=> {
            cy.visit('/register')

            cy.get('input[type="text"]').should('be.visible').as('inputUsername')
            cy.get('@inputUsername').type(userName)

            cy.get('input[type="email"]').should('be.visible').as('inputEmail')
            cy.get('@inputEmail').type(email)

            cy.get('input[type="password"]').should('be.visible').as('inputPassword')
            cy.get('@inputPassword').type(password)

            cy.get('button[type="submit"]').should('be.visible').as('buttonSignin')
            cy.get('@buttonSignin').click()

            cy.get('a').contains(`${userName}`).should('be.visible')
            cy.get('a').contains('New Article').should('be.visible')
        })
    })
})