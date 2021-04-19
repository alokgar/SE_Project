//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const Address = require("../models/Address");
const Customer = require("../models/Customer");
const City = require("../models/City");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe("Cusmoter", () => {
  before((done) => {
    //Before each test we empty the database
    Customer.remove({}, (err) => {});
    Address.remove({}, (err) => {});
    City.remove({}, (err) => {
      done();
    });
  });

  // Test the customer GET route   -----------------------------------------------------------------------------------------------------------
  describe("/GET customer", () => {
    //get all the customers
    it("it should GET all the customers", (done) => {
      chai
        .request(server)
        .get("/api/customer")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    //get  customer with id
    it("it should GET customer with the given id", (done) => {
      let customer = new Customer({
        first_name: "Alok",
        last_name: "paisawala",
        mobile_no: 656772233,
        line1: "1namanddf2hjhjgfgjh",
        landmark: "efdefefef",
        pincode: "3493049",
        name: "gtggdf",
        employee_id: "6045947b0eeecc03af04900f",
      });

      customer.save((err, customer1) => {
        chai
          .request(server)
          .get("/api/customer/" + customer1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id").eql(customer1.id);
            done();
          });
      });
    });
  });

  // Test the customer POST route to add customer ---------------------------------------------------------------------------------------
  // describe("/POST customer", () => {
  //   // should not POST a customer with mobile number same as the previously stored cutomer's
  //   it("it should not POST a customer with same  mobile number", (done) => {
  //     let customer = new Customer({
  //       first_name: "Alok",
  //       last_name: "paisawala",
  //       mobile_no: 656772233,
  //       line1: "1namanddf2hjhjgfgjh",
  //       landmark: "efdefefef",
  //       pincode: "3493049",
  //       name: "gtggdf",
  //       employee_id: "6045947b0eeecc03af04900f",
  //     });

  //     customer.save((err, customer1) => {
  //       let customer2 = {
  //         first_name: "Naman",
  //         last_name: "paisawala",
  //         mobile_no: 656772233,
  //         line1: "1namanddf2hjhjgfgjh",
  //         landmark: "efdefefef",
  //         pincode: "3493049",
  //         name: "Indore",
  //         employee_id: "6045947b0eeecc03af04900f",
  //       };
  //       chai
  //         .request(server)
  //         .post("/api/customer")
  //         .send(customer2)
  //         .end((err, res) => {
  //           res.should.have.status(404);
  //           res.body.should.be.a("object");
  //           res.body.should.have.property("msg");
  //           res.body.should.have
  //             .property("msg")
  //             .eql("Customer Already exist with the mobile number !");
  //           done();
  //         });
  //     });
  //   });

  //   // POST a customer succesfully
  //   it("it should POST a customer", (done) => {
  //     let customer = {
  //       first_name: "Alok",
  //       last_name: "paisawala",
  //       mobile_no: 9863847567,
  //       line1: "1namanddf2hjhjgfgjh",
  //       landmark: "efdefefef",
  //       pincode: "3493049",
  //       name: "gtggdf",
  //       employee_id: "6045947b0eeecc03af04900f",
  //     };
  //     chai
  //       .request(server)
  //       .post("/api/customer")
  //       .send(customer)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("msg").eql("Customer Added !");
  //         done();
  //       });
  //   });
  // });

  // Test the custome /PUT route ------------------------------------------------------------------------------------------------
  describe("/PUT customer/:id", () => {
    it("it should update the customer given the id ", (done) => {
      let customer = new Customer({
        first_name: "Alok",
        last_name: "paisawala",
        mobile_no: 9863847567,
        line1: "1namanddf2hjhjgfgjh",
        landmark: "efdefefef",
        pincode: "3493049",
        name: "gtggdf",
        employee_id: "6045947b0eeecc03af04900f",
      });

      customer.save((err, customer1) => {
        let customer2 = {
          first_name: "Naman",
          last_name: "paisawala",
          mobile_no: 9997778881,
          line1: "1namanddf2hjhjgfgjh",
          landmark: "efdefefef",
          pincode: "3493049",
          name: "Indore",
          employee_id: "6045947b0eeecc03af04900f",
        };
        chai
          .request(server)
          .put("/api/customer/" + customer1.id)
          .send(customer2)
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              should.exist(res);
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("first_name").eql("Naman");
              res.body.should.have.property("_id").eql(customer1.id);
              done();
            }
          });
      });
    });
  });

  //Test the customer /DELETE/:id route -----------------------------------------------------------------------------------
  describe("/DELETE/:id customer", () => {
    // deleting customer with id
    it("it should DELETE a customer given the id", (done) => {
      let customer = new Customer({
        first_name: "Alok",
        last_name: "paisawala",
        mobile_no: 9863847567,
        line1: "1namanddf2hjhjgfgjh",
        landmark: "efdefefef",
        pincode: "3493049",
        name: "gtggdf",
        employee_id: "6045947b0eeecc03af04900f",
      });

      customer.save((err, customer1) => {
        chai
          .request(server)
          .delete("/api/customer/" + customer1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Customer removed");
            res.body.result.should.have.property("_id").eql(customer1.id);
            done();
          });
      });
    });

    // deleting customer with id not present in customer table
    it("it should not DELETE as customer with id is not present in the database", (done) => {
      let customer = new Customer({
        first_name: "Alok",
        last_name: "paisawala",
        mobile_no: 9863847567,
        line1: "1namanddf2hjhjgfgjh",
        landmark: "efdefefef",
        pincode: "3493049",
        name: "gtggdf",
        employee_id: "6045947b0eeecc03af04900f",
      });

      chai
        .request(server)
        .delete("/api/customer/" + customer.id)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("Customer not found");
          done();
        });
    });
  });
});
