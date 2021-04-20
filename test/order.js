//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const Order = require("../models/Order");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe("Order", () => {
  before((done) => {
    //Before each test we empty the test database
    Order.remove({}, (err) => {
      done();
    });
  });

  // Test the order GET route   -----------------------------------------------------------------------------------------------------------
  describe("/GET order", () => {
    //get all the orders
    // it("it should GET all the orders", (done) => {
    //   chai
    //     .request(server)
    //     .get("/api/order")
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a("array");
    //       res.body.length.should.be.eql(0);
    //       done();
    //     });
    // });

    //get  order with id
    it("it should GET order with the given id", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "111",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      order.save((err, order1) => {
        chai
          .request(server)
          .get("/api/order/" + order1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id").eql(order1.id);
            done();
          });
      });
    });
  });

  // Test the order POST route to add order ---------------------------------------------------------------------------------------
  describe("/POST order", () => {
    // POST a order succesfully
    it("it should POST a order", (done) => {
      let order = {
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "111",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      };
      chai
        .request(server)
        .post("/api/order")
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.details.length.should.be.eql(2);
          done();
        });
    });
  });

  // Test the custome /PUT route ------------------------------------------------------------------------------------------------
  describe("/PUT order/:id", () => {
    // update an order given a id present in database
    it("it should update the order given the id ", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "111",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      order.save((err, order1) => {
        let order2 = {
          customer_id: "605a19203407524404772332",
          details: [
            {
              product_id: "6045ad05b0fd7a073a09106f",
              quantity: "222",
              size_id: "604600add951a76581300732",
            },
            {
              product_id: "6045ae9db0fd7a073a091070",
              quantity: "60",
              size_id: "604600add951a76581300732",
            },
          ],
          employee_id: "6045947b0eeecc03af04900f",
        };
        chai
          .request(server)
          .put("/api/order/" + order1.id)
          .send(order2)
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              should.exist(res);
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.details[0].should.have.property("quantity").eql(222);
              res.body.should.have.property("_id").eql(order1.id);
              done();
            }
          });
      });
    });

    // update an order given a id not present in database
    it("it should not update the order given the id not in databse", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "111",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      chai
        .request(server)
        .put("/api/order/" + order.id)
        .send(order)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.exist(res);
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("No Order found !");
            done();
          }
        });
    });
  });

  //Test the order /DELETE/:id route -----------------------------------------------------------------------------------
  describe("/DELETE/:id order", () => {
    // deleting order with id
    it("it should DELETE a order given the id", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "222",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      order.save((err, order1) => {
        chai
          .request(server)
          .delete("/api/order/" + order1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Order removed");
            done();
          });
      });
    });

    // deleting order with id not present in order table
    it("it should not DELETE as order with id is not present in the database", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "222",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      chai
        .request(server)
        .delete("/api/order/" + order.id)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("Order not found");
          done();
        });
    });
  });

  //Test the order /confirm/:id route -----------------------------------------------------------------------------------
  describe("/Confirm/:id order", () => {
    // conforming order with id
    it("it should Confirm a order given the id", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "222",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      order.save((err, order1) => {
        chai
          .request(server)
          .post("/api/order/" + order1.id + "/confirm")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Order Confirmed");
            done();
          });
      });
    });

    // confirming order with id not present in order table
    it("it should not Confirm order with id is not present in the database", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "222",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      chai
        .request(server)
        .post("/api/order/" + order.id + "/confirm")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("No Order found !");
          done();
        });
    });
  });

  //Test the order /Dispatch/:id route -----------------------------------------------------------------------------------
  describe("/Dispatch/:id order", () => {
    // change status to dispatch of order with id
    it("it should change status to dispatch of  order given the id", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "222",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      order.save((err, order1) => {
        chai
          .request(server)
          .post("/api/order/" + order1.id + "/dispatch")
          .send(order1)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Order Dispatched");
            done();
          });
      });
    });

    // change status to dispatch of order with id not present in order table
    it("it should not change status to dispatch of order with id is not present in the database", (done) => {
      let order = new Order({
        customer_id: "605a19203407524404772332",
        details: [
          {
            product_id: "6045ad05b0fd7a073a09106f",
            quantity: "222",
            size_id: "604600add951a76581300732",
          },
          {
            product_id: "6045ae9db0fd7a073a091070",
            quantity: "60",
            size_id: "604600add951a76581300732",
          },
        ],
        employee_id: "6045947b0eeecc03af04900f",
      });

      chai
        .request(server)
        .post("/api/order/" + order.id + "/dispatch")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("No Order found !");
          done();
        });
    });
  });
});
