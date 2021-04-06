//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let size = require("../models/Size");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Size", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    size.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET size", () => {
    it("it should GET all the sizes", (done) => {
      chai
        .request(server)
        .get("/api/size")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Test the size POST route to add size ---------------------------------------------------------------------------------------
  describe("/POST size", () => {
    // POST a size succesfully
    it("it should POST a size", (done) => {
      let sizes = {
        packing_type: "A",
        unit: "kg",
      };
      chai
        .request(server)
        .post("/api/size")
        .send(sizes)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("unit").eql("kg");
          done();
        });
    });
  });
});

/*
 * Test the /PUT route
 */
describe("/PUT size/:id", () => {
  it("Edit function of size is being checked", (done) => {
    let sizes = new size({
      packing_type: "BigB",
      unit: "lt",
    });
    sizes.save((err, size) => {
      if (err) {
        console.log(err);
      }
      chai
        .request(server)
        .put("/api/size/" + size._id)
        .send({
          packing_type: "BigB",
          unit: "kg",
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("unit").eql("kg");

            done();
          }
        });
    });
  });
});

/*
 * Test the /DELETE route
 */
describe("/DELETE size/:id", () => {
  it("Delete function of size is being checked", (done) => {
    let sizes = new size({
      packing_type: "BigB",
      unit: "lt",
    });
    sizes.save((err, size) => {
      if (err) {
        console.log(err);
      }
      chai
        .request(server)
        .delete("/api/size/" + size._id)
        .send({})
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Size removed");

            done();
          }
        });
    });
  });
});
