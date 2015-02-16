'use strict';

require('../index');
var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
var expect = chai.expect;

chai.use(chaihttp);

describe('The server', function() {
  beforeEach(function(){
    fs.writeFileSync('./db/file1.json', '{ "name": "Bilbo", "age": "999" }\n');
  });

  after(function(){
    try{
      fs.unlinkSync("./db/file2.json");
    } catch(err) {}
  });

  it('should GET ', function(done) {
    chai.request('localhost:3000')
      .get('/file1.json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{ "name": "Bilbo", "age": "999" }\n');
        done();
      });
  });

  it('should PUT ', function(done) {
    chai.request('localhost:3000')
      .put('/file1.json')
      .send({"PUT": "did this"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should POST ', function(done) {
    chai.request('localhost:3000')
      .post('/file2.json')
      .send({"POST": "did this"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should PATCH ', function(done) {
    chai.request('localhost:3000')
      .patch('/file2.json')
      .send({"PATCH": "did this"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });


  // it('should DELETE ', function(done) {
  //   chai.request('localhost:3000')
  //     .del('/file1.json')
  //     .end(function(err, res) {
  //       expect(err).to.eql(null);
  //       // expect(res).to.have.status(200);
  //       // expect(fs.readFileSync('./db/file1.json')).not.to.exist();
  //       done();
  //     });
  // });
});
