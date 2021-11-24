/// <reference types="Cypress" />

describe('Conduit application scenarios testing', ()=> {
    context('tests with success result', ()=> {
        
        beforeEach(()=> {
            cy.visit('/')
        })

        it('CT01 - US01 - A User created with success.', ()=> {
            cy.createUser()

            //Assert
            cy.get('a').contains('New Article').should('exist').and('be.visible')
        })

        it('CT02 - US01 - Logout with success.', ()=>{
            cy.login()
            cy.logout()

            //Assert
            cy.get('a').contains('Sign in').should('exist').and('be.visible')
            cy.get('a').contains('Sign up').should('exist').and('be.visible')
        })

        it('CT03 - US01 - Create a new article with success.', ()=>{
            cy.login()
            cy.createArticle()

            //Assert
            cy.get('a').contains('Edit Article').should('exist').and('be.visible')
        })

        it('CT04 - US01 - Delete an article with success.', ()=>{
            cy.login()
            cy.createArticle()
            cy.deleteArticle()

            //Assert
            cy.get('a').contains('Home').should('have.attr', 'class', 'nav-link active').and('exist')
        })

        it('CT05 - US01 - Click the like button for an article with success', ()=>{
            cy.login()
            cy.createArticle()
            cy.likeArticle()

            //Assert
            cy.get('span').first().contains(1).should('exist').and('be.visible')
        })
    })
})