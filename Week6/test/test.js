import pkg from 'chai';
const { expect } = pkg;
import chaiHttp from 'chai-http';
import app from '../server.js';

// Register chaiHttp with chai
pkg.use(chaiHttp);

// Tests
describe('Testing Srihitha Event Management API', function () {
  it('1. Should return the homepage message', function (done) {
    pkg.request(app)
      .get('/api/home')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Welcome to Srihitha Event Management! Your one-stop solution to manage events seamlessly.');
        done();
      });
  });

  it('2. Should return the about message', function (done) {
    pkg.request(app)
      .get('/api/about')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('We provide various services to manage events, including event planning, decoration, catering, photography, and more.');
        done();
      });
  });

  it('3. Should return event prices', function (done) {
    pkg.request(app)
      .get('/api/prices')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('eventPrices').to.be.an('array');
        expect(res.body.eventPrices).to.deep.include({ event: "Wedding", price: "$2000" });
        expect(res.body.eventPrices).to.deep.include({ event: "Birthday", price: "$500" });
        expect(res.body.eventPrices).to.deep.include({ event: "Gender Reveal", price: "$800" });
        done();
      });
  });

  it('4. Should return contact information', function (done) {
    pkg.request(app)
      .get('/api/contact')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('contactInfo').to.be.an('object');
        expect(res.body.contactInfo).to.have.property('phone').eql('+123456789');
        expect(res.body.contactInfo).to.have.property('email').eql('info@srihithaevents.com');
        expect(res.body.contactInfo.social).to.have.property('facebook').eql('https://facebook.com');
        expect(res.body.contactInfo.social).to.have.property('twitter').eql('https://twitter.com');
        done();
      });
  });

  it('5. Should return error for invalid login', function (done) {
    pkg.request(app)
      .post('/api/login')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').eql('Email and password are required.');
        done();
      });
  });

  it('6. Should successfully log in with valid credentials', function (done) {
    pkg.request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Login successful for email: test@example.com');
        done();
      });
  });
});