/// <reference types="cypress" />

const testUser = {
  name: 'Test user',
  username: 'testuser',
  password: 'testPassword1234!@#$',
};

const testUser2 = {
  name: 'Test user 2',
  username: 'testuser2',
  password: 'testPassword1234!@#$',
};

const testBlog = {
  title: 'Test title',
  url: 'http://test.com',
};

const apiUrl = 'http://localhost:3003/api';
const WAIT_TIME = 300;

describe('Blog App', function () {
  it('should open the app', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Blog Posts');
  });

  beforeEach(function () {
    cy.request('POST', `${apiUrl}/testing/reset`);
    cy.request('POST', `${apiUrl}/users/`, testUser);
    cy.request('POST', `${apiUrl}/users/`, testUser2);
    cy.visit('http://localhost:3000');
  });

  it('should login with the correct credentials', function () {
    cy.login(testUser.username, testUser.password);
    cy.contains(`${testUser.username} logged in`);
  });

  it('should not login with the incorrect credentials', function () {
    cy.login(testUser.username, 'wrongPassword');
    cy.get('.error')
      .should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login(testUser.username, testUser.password);
    });

    it('a new blog post can be created', function () {
      cy.createBlogPost(testBlog.title, testBlog.url);
      cy.get('.success')
        .should('contain', `Blog post ${testBlog.title} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.contains(`${testBlog.title} by ${testUser.name}`);
    });

    describe('and a blog post by the user already exists', function () {
      beforeEach(function () {
        cy.createBlogPost(testBlog.title, testBlog.url);
      });

      it('the blog can be liked', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.contains('1 likes');
      });

      it('the blog can be deleted', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.contains(`${testBlog.title} by ${testUser.name}`).should('not.exist');
      });
    });

    describe('and multiple blog posts by the user already exist', function () {
      beforeEach(function () {
        cy.createBlogPost(testBlog.title, testBlog.url);
        cy.createBlogPost('Test title 2', 'http://test2.com');
        cy.createBlogPost('Test title 3', 'http://test3.com');
      });

      it('the blog posts are ordered by likes', function () {
        cy.contains(`${testBlog.title} by ${testUser.name}`).as('firstBlog');
        cy.contains('Test title 2 by Test user').as('secondBlog');
        cy.contains('Test title 3 by Test user').as('thirdBlog');

        // Likes for the third post
        cy.get('@thirdBlog').contains('view').click();
        cy.get('@thirdBlog').contains('like').click();
        cy.wait(WAIT_TIME);
        cy.get('@thirdBlog').contains('like').click();
        cy.wait(WAIT_TIME);
        cy.get('@thirdBlog').contains('like').click();
        cy.wait(WAIT_TIME);
        // Likes for the first post
        cy.get('@firstBlog').contains('view').click();
        cy.get('@firstBlog').contains('like').click();
        cy.wait(WAIT_TIME);
        cy.get('@firstBlog').contains('like').click();
        cy.wait(WAIT_TIME);
        // Likes for the second post
        cy.get('@secondBlog').contains('view').click();
        cy.get('@secondBlog').contains('like').click();
        cy.wait(1000);

        cy.get('#posts-list').then((blogs) => {
          cy.wrap(blogs[0]).contains('Test title 3 by Test user');
          cy.wrap(blogs[1]).contains('Test title by Test user');
          cy.wrap(blogs[2]).contains('Test title 2 by Test user');
        });
      });
    });

    describe('and a blog post by another user already exists', function () {
      beforeEach(function () {
        cy.clickButton('Logout');
        cy.login(testUser2.username, testUser2.password);
        cy.createBlogPost(testBlog.title, testBlog.url);
        cy.clickButton('Logout');
        cy.login(testUser.username, testUser.password);
      });

      it('the blog cannot be deleted', function () {
        cy.contains('view').click();
        cy.contains('remove').should('not.exist');
      });
    });
  });
});
