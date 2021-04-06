//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Product = require("../models/Product");
let Category = require("../models/Category");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Product", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Product.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET Product", () => {
    it("it should GET all the Products", (done) => {
      chai
        .request(server)
        .get("/api/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Test the Product POST route to add size ---------------------------------------------------------------------------------------
  describe("/POST product", () => {
    // POST a product succesfully
    it("it should POST a size", (done) => {
      let category = new Category({
        name: "nitrogen",
        description: "good product",
      });

      category.save((err, category) => {
        let product = {
          name: "nitrogen x10",
          description: "good one",
          category_name: category.name,
        };

        chai
          .request(server)
          .post("/api/products")
          .send(product)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name").eql("nitrogen x10");
            done();
          });
      });
    });
  });

  // Test the Product PUT route to add size ---------------------------------------------------------------------------------------
  describe("/PUT product", () => {
    // PUT a product succesfully
    it("it should PUT a product", (done) => {
      let product = new Product({
        name: "oxygen",
        description: "good product",
        category_id: "606c540607ad8137ff5c5216",
      });

      product.save((err, product) => {
        let product1 = {
          name: "oxygen nitrogen x10",
          description: "good one",
          category_id: "606c540607ad8137ff5c5216",
        };

        chai
          .request(server)
          .put("/api/products/" + product.id)
          .send(product1)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name").eql("oxygen nitrogen x10");
            done();
          });
      });
    });
  });

  // Test the Product PUT route to add size ---------------------------------------------------------------------------------------
  describe("/DELETE product", () => {
    // PUT a product succesfully
    it("it should delete a product", (done) => {
      let product = new Product({
        name: "urea",
        description: "good product",
        category_id: "606c540607ad8137ff5c5216",
      });

      product.save((err, product) => {
        chai
          .request(server)
          .delete("/api/products/" + product.id)
          .send({})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("product removed");
            done();
          });
      });
    });
  });
});
