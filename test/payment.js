//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const Payment = require("../models/Payment");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe("Payment", () => {
  before((done) => {
    //Before each test we empty the database
    Payment.remove({}, (err) => {
      done();
    });
  });

  // Test the payment GET route   -----------------------------------------------------------------------------------------------------------
  describe("/GET payment", () => {
    //get all the payments
    it("it should GET all the payments", (done) => {
      chai
        .request(server)
        .get("/api/payment")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    //get  payment with id
    it("it should GET payment with the given id", (done) => {
      let payment = new Payment({
        amount: "15000",
        customer_id: "604882eaeb0bd73de0965bce",
      });

      payment.save((err, payment1) => {
        chai
          .request(server)
          .get("/api/payment/" + payment1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id").eql(payment1.id);
            done();
          });
      });
    });
  });

  // Test the payment POST route to add payment ---------------------------------------------------------------------------------------
  describe("/POST payment", () => {
    // POST a payment succesfully
    // it("it should POST a payment", (done) => {
    //   let payment = {
    //     amount: "15000",
    //     customer_id: "604882eaeb0bd73de0965bce",
    //   };
    //   chai
    //     .request(server)
    //     .post("/api/payment")
    //     .send(payment)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a("object");
    //       res.body.should.have.property("amount").eql(15000);
    //       done();
    //     });
    // });
  });

  // Test the Payment/PUT route ------------------------------------------------------------------------------------------------
  describe("/PUT payment/:id", () => {
    it("it should update the payment given the id ", (done) => {
      let payment = new Payment({
        amount: "15000",
        customer_id: "604882eaeb0bd73de0965bce",
      });

      payment.save((err, payment1) => {
        let payment2 = {
          amount: "25000",
          customer_id: "604882eaeb0bd73de0965bce",
        };
        chai
          .request(server)
          .put("/api/payment/" + payment1.id)
          .send(payment2)
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              should.exist(res);
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("amount").eql(25000);
              res.body.should.have.property("_id").eql(payment1.id);
              done();
            }
          });
      });
    });

    it("it should not update the payment given the id not in document", (done) => {
      let payment = new Payment({
        amount: "15000",
        customer_id: "604882eaeb0bd73de0965bce",
      });

      chai
        .request(server)
        .put("/api/payment/" + payment.id)
        .send(payment)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.exist(res);
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("No Payment found !");
            done();
          }
        });
    });
  });

  //Test the payment /DELETE/:id route -----------------------------------------------------------------------------------
  describe("/DELETE/:id payment", () => {
    // deleting payment with id
    it("it should DELETE a payment given the id", (done) => {
      let payment = new Payment({
        amount: "15000",
        customer_id: "604882eaeb0bd73de0965bce",
      });

      payment.save((err, payment1) => {
        chai
          .request(server)
          .delete("/api/payment/" + payment1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Payment removed");
            done();
          });
      });
    });

    // deleting payment with id not present in payment table
    it("it should not DELETE as payment with id is not present in the database", (done) => {
      let payment = new Payment({
        amount: "15000",
        customer_id: "604882eaeb0bd73de0965bce",
      });

      chai
        .request(server)
        .delete("/api/payment/" + payment.id)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("Payment not found");
          done();
        });
    });
  });
});
