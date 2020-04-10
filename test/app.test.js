//17.5 assignment

//we need to require Chai expect, app, & supertest (17.5, p. 23)
const { expect } = require('chai');
const supertest = require('supertest'); 
const app = require('../app'); //app is the Express object

const apps = require('../playstore.js');

describe('GET /apps', () => {

    it('should return complete list of apps in the array', () => {
        return supertest(app)
            .get('/apps')
            .expect(200, apps);
    })

    it('/apps?sort=Rating should return a list of apps sorted by Rating (lowest to highest)', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;
                let i = 0;
                while(i<res.body.length - 1){
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i+1];
                    if (appAtI.Rating > appAtIPlus1.Rating){
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
    })

    it('/apps?sort=App should return a list of apps sorted by App (alphabetically)', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'App'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;
                let i = 0;
                while(i<res.body.length - 1){
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i+1];
                    if (appAtI.App > appAtIPlus1.App){
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
    })


    it('/apps?genres=Action should return a list of apps that are in the Action Genres', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'Action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                for(let i=0; i<res.body.length; i++){
                    expect(res.body[i].Genres).to.include('Action');
                }
            })
    })

    it('should return 400 if sort is not "Rating" or "App"', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'Category'})
            .expect(400)
    })

    it('should return 400 if genres is not "Action", "Puzzle", "Strategy", "Casual", "Arcade", or "Card"', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'Thriller'})
            .expect(400)
    })



}) //end describe function


