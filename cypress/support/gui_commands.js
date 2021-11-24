/// <reference types="Cypress" />
const faker = require('faker')

Cypress.Commands.add('createUser', ()=>{
    const userName = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    cy.visit('/register')

    cy.get('input[type="text"]').should('be.visible').as('inputUsername')
    cy.get('@inputUsername').type(userName)

    cy.get('input[type="email"]').should('be.visible').as('inputEmail')
    cy.get('@inputEmail').type(email)

    cy.get('input[type="password"]').should('be.visible').as('inputPassword')
    cy.get('@inputPassword').type(password)

    cy.get('button[type="submit"]').should('be.visible').as('buttonSignin')
    cy.get('@buttonSignin').click()

    cy.get('a').contains(`${userName}`).should('exist').and('be.visible')
})

Cypress.Commands.add('login', ()=>{
    cy.visit('/login')
    cy.get('input[type="email"]').should('be.visible').as('inputEmail')
    cy.get('@inputEmail').type(Cypress.env('userEmail'))

    cy.get('input[type="password"]').should('be.visible').as('inputPassword')
    cy.get('@inputPassword').type(Cypress.env('userPassword'))

    cy.get('button[type="submit"]').should('be.visible').as('buttonSignin')
    cy.get('@buttonSignin').click()

    cy.get('a').contains(Cypress.env('userName')).should('exist').and('be.visible')
})

Cypress.Commands.add('logout', ()=>{
    cy.visit('/settings')
    cy.get('button').contains('Or click here to logout.').should('exist').and('be.visible').click()
})

Cypress.Commands.add('createArticle', ()=>{
    const articleTitle = faker.random.word()
    const articleAbout = faker.random.word()
    const articleBody = faker.random.words(20)
    const articleTag = faker.random.word()

    cy.visit('/editor')
    cy.get('a').contains('New Article').should('exist').and('be.visible').click()
    cy.get('input[placeholder="Article Title"]').should('exist').and('be.visible').type(articleTitle)
    cy.get('input[ng-model="$ctrl.article.description"]').should('exist').and('be.visible').type(articleAbout)
    cy.get('textarea').should('exist').and('be.visible').type(articleBody)
    cy.get('input[ng-model="$ctrl.tagField"]').should('exist').and('be.visible').type(articleTag)
    cy.get('button').contains('Publish Article').should('exist').and('be.visible').click()

    cy.get('h1').contains(articleTitle).should('exist').and('be.visible')
    cy.get('p').contains(articleBody).should('exist').and('be.visible')
})

Cypress.Commands.add('deleteArticle', ()=>{
    cy.get('a').contains(Cypress.env('userName')).should('exist').and('be.visible').click()
    cy.get('.articles-toggle > .nav > :nth-child(1) > .nav-link').should('exist').and('be.visible')
    cy.get('article-list.ng-scope > :nth-child(1) > .article-preview').should('exist').and('be.visible').click()
    cy.get('textarea[rows="3"]').should('exist').and('be.visible')
    cy.get('button').contains('Delete Article').first().should('exist').and('be.visible').click()
})

Cypress.Commands.add('likeArticle', ()=>{
    cy.get('a').contains(Cypress.env('userName')).should('exist').and('be.visible').click()
    cy.contains('My Articles').should('exist').and('be.visible')
    cy.get('.ion-heart').first().click()
    cy.contains('Favorited Articles').should('exist').and('be.visible').click()
})