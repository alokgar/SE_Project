//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const Feedback = require("../models/Feedback");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe("Feedback", () => {
  before((done) => {
    //Before each test we empty the database
    Feedback.remove({}, (err) => {});
    let f = new Feedback({
      subject: "Hi Feedback",
      content: "Hi hjklm.lk;lk'jijk",
    }).save();

    done();
  });

  // Test the feedback GET route   -----------------------------------------------------------------------------------------------------------
  describe("/GET feedback", () => {
    //get all the feedbacks
    it("it should GET all the feedbacks", (done) => {
      chai
        .request(server)
        .get("/api/feedback")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });

    //get  feedback with id
    it("it should GET feedback with the given id", (done) => {
      let feedback = new Feedback({
        subject: "Hiiii Feedback",
        content: "Hi hjklm.lk;lk'jijk",
      });

      feedback.save((err, feedback1) => {
        chai
          .request(server)
          .get("/api/feedback/" + feedback1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id").eql(feedback1.id);
            res.body.should.have.property("subject").eql("Hiiii Feedback");
            done();
          });
      });
    });
  });

  // Test the feedback POST route to add feedback ---------------------------------------------------------------------------------------
  describe("/POST feedback", () => {
    // POST a feedback succesfully
    // it("it should POST a feedback", (done) => {
    //   let feedback = {
    //     subject: "Hiiii Feedback",
    //     content: "Hi hjklm.lk;lk'jijk",
    //   };
    //   chai
    //     .request(server)
    //     .post("/api/feedback")
    //     .send(feedback)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a("object");
    //       res.body.should.have.property("subject").eql("Hiiii Feedback");
    //       done();
    //     });
    // });
  });

  // Test the Feedback/PUT route ------------------------------------------------------------------------------------------------
  describe("/PUT feedback/:id", () => {
    it("it should update the feedback given the id ", (done) => {
      let feedback = new Feedback({
        subject: "Hiiii Feedback",
        content: "Hi hjklm.lk;lk'jijk",
      });

      feedback.save((err, feedback1) => {
        let feedback2 = {
          subject: "No Feedback",
          content: "Hi hjklm.lk;lk'jijk",
        };
        chai
          .request(server)
          .put("/api/feedback/" + feedback1.id)
          .send(feedback2)
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              should.exist(res);
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("subject").eql("No Feedback");
              res.body.should.have.property("_id").eql(feedback1.id);
              done();
            }
          });
      });
    });

    it("it should not update the feedback given the id not in document", (done) => {
      let feedback = new Feedback({
        subject: "No Feedback",
        content: "Hi hjklm.lk;lk'jijk",
      });

      chai
        .request(server)
        .put("/api/feedback/" + feedback.id)
        .send(feedback)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            should.exist(res);
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("No Feedback found !");
            done();
          }
        });
    });
  });

  //Test the feedback /DELETE/:id route -----------------------------------------------------------------------------------
  describe("/DELETE/:id feedback", () => {
    // deleting feedback with id
    it("it should DELETE a feedback given the id", (done) => {
      let feedback = new Feedback({
        subject: "No Feedback",
        content: "Hi hjklm.lk;lk'jijk",
      });

      feedback.save((err, feedback1) => {
        chai
          .request(server)
          .delete("/api/feedback/" + feedback1.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("msg").eql("Feedback removed");
            done();
          });
      });
    });

    // deleting feedback with id not present in feedback table
    it("it should not DELETE as feedback with id is not present in the database", (done) => {
      let feedback = new Feedback({
        subject: "No Feedback",
        content: "Hi hjklm.lk;lk'jijk",
      });

      chai
        .request(server)
        .delete("/api/feedback/" + feedback.id)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("Feedback not found");
          done();
        });
    });
  });
});
