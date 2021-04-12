//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const Stock = require("../models/Stock");
const Product = require("../models/Product");
const Size = require("../models/Size");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe("Stock", () => {
  before((done) => {
    //Before each test we empty the database
    Stock.remove({}, (err) => {
      let p = new Product({
        name: "342_Nitroge",
        description: "342_Nitroge",
        category_name: "A",
      }).save();

      let s = new Size({
        packing_type: "500",
        unit: "kg",
      }).save();
      done();
    });
  });

  // Test the stock GET route   -----------------------------------------------------------------------------------------------------------
  describe("/GET stock", () => {
    //get all the stocks
    it("it should GET all the stocks", (done) => {
      chai
        .request(server)
        .get("/api/stock")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Test the stock POST route to add stock ---------------------------------------------------------------------------------------
  describe("/POST stock", () => {
    // should not POST a stock if packing size not availble
    it("it should not POST a stock if packing size not availble", (done) => {
      let stock = {
        price: "267000",
        quantity: "15",
        product_name: "342_Nitroge",
        size_packing_type: "CDE",
      };

      chai
        .request(server)
        .post("/api/stock")
        .send(stock)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("msg").eql("size not found");
          done();
        });
    });

    // should not POST a stock if product name not availble
    it("it should not POST a stock if product name not availble", (done) => {
      let stock = {
        price: "267000",
        quantity: "15",
        product_name: "22333ers",
        size_packing_type: "C",
      };

      chai
        .request(server)
        .post("/api/stock")
        .send(stock)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("msg").eql("product not found");
          done();
        });
    });

    // POST a stock succesfully
    it("it should POST a stock", (done) => {
      let stock = {
        price: "267000",
        quantity: "15",
        product_name: "342_Nitroge",
        size_packing_type: "500",
      };
      chai
        .request(server)
        .post("/api/stock")
        .send(stock)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("price").eql(267000);
          res.body.should.have.property("quantity").eql(15);
          done();
        });
    });
  });

  // Test the custome /PUT route ------------------------------------------------------------------------------------------------
  describe("/PUT stock/:id", () => {
    it("it should update the stock given the id ", (done) => {
      let stock = new Stock({
        price: "267000",
        quantity: "15",
        product_name: "342_Nitroge",
        size_packing_type: "500",
      });

      stock.save((err, stock1) => {
        let stock2 = {
          price: "30000",
          quantity: "25",
          product_name: "342_Nitroge",
          size_packing_type: "500",
        };
        chai
          .request(server)
          .put("/api/stock/" + stock1.id)
          .send(stock2)
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              should.exist(res);
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("price").eql(30000);
              res.body.should.have.property("quantity").eql(25);
              done();
            }
          });
      });
    });

    it("it should update the stock given the id ", (done) => {
      let stock = new Stock({
        price: "267000",
        quantity: "15",
        product_name: "342_Nitroge",
        size_packing_type: "500",
      });

      chai
        .request(server)
        .put("/api/stock/" + stock.id)
        .send(stock)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.exist(res);
            res.should.have.status(404);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("stock not found");
            done();
          }
        });
    });
  });

  //Test the stock /DELETE/:id route -----------------------------------------------------------------------------------
  describe("/DELETE/:id stock", () => {
    // deleting stock with id
    it("it should DELETE a stock given the id", (done) => {
      let stock = new Stock({
        price: "267000",
        quantity: "15",
        product_name: "342_Nitroge",
        size_packing_type: "500",
      });

      stock.save((err, stock1) => {
        chai
          .request(server)
          .delete("/api/stock/" + stock1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Stock removed");
            done();
          });
      });
    });

    // deleting stock with id not present in stock table
    it("it should not DELETE as stock with id is not present in the database", (done) => {
      let stock = new Stock({
        price: "267000",
        quantity: "15",
        product_name: "342_Nitroge",
        size_packing_type: "500",
      });

      chai
        .request(server)
        .delete("/api/stock/" + stock.id)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("stock not found");
          done();
        });
    });
  });
});
