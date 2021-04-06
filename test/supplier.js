//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Supplier = require("../models/Supplier");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Supplier", () => {
    before((done) => {
        //Before each test we empty the database
        Supplier.remove({}, (err) => {
            done();
        });
    });

    after((done) => {
        Supplier.remove({}, (err) => {
            done();
        });
    });


    /*
     * Test the /GET route
     */
    describe("/GET supplier", () => {
        it("it should GET all the suppliers", (done) => {
            chai
                .request(server)
                .get("/api/supplier")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    /*
      * Test the /POST route
      */
    describe('/POST supplier', () => {
        it('it should POST a supplier', (done) => {
            let supplier = {
                name: "Naman Patidar",
                email: "naman@gmail.com",
                mobile_no: "9799053931",
                line1: "me-037",
                landmark: "Near stadium",
                pincode: "815205",
                city_name: "Indori-city"
            }
            chai.request(server)
                .post("/api/supplier")
                .send(supplier)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Naman Patidar');
                    done();
                });
        });
    });

    /*
      * Test the /PUT route
      */
    describe('/PUT supplier/:id', () => {
        it('Edit function of supplier is being checked', (done) => {
            let supplier = new Supplier({
                name: "Naman Patidar",
                email: "Pnaman03@gmail.com",
                mobile_no: "9799053931",
                line1: "me-037",
                landmark: "Near stadium",
                pincode: "815205",
                city_name: "Indori-city"
            });
            supplier.save((err, supplier) => {
                if(err){
                    console.log(err);
                }
                chai.request(server)
                    .put('/api/supplier/' + supplier._id)
                    .send({
                        name: "Lokesh daga",
                        email: "daga@gmail.com",
                        mobile_no: "9799053931",
                        line1: "me-037",
                        landmark: "Near stadium",
                        pincode: "815205",
                        city_name: "Indori-city"
                    })
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            should.exist(res);
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name').eql('Lokesh daga');
                            res.body.should.have.property('email').eql("daga@gmail.com");
                            done();
                        }

                    });
            });
        });

    });

    /*
      * Test the /DELETE route
      */
    describe('/DELETE supplier/:id', () => {
        it('Delete function of supplier is being checked', (done) => {
            let supplier = new Supplier({
                name: "Naman Patidar",
                email: "Pnaman03@gmail.com",
                mobile_no: "9799053931",
                line1: "me-037",
                landmark: "Near stadium",
                pincode: "815205",
                city_name: "Indori-city"
            })
            supplier.save((err, supplier) => {
                chai.request(server)
                    .delete('/api/supplier/' + supplier._id)
                    .send({})
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            should.exist(res);
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('msg').eql('Supplier removed');
                            done();
                        }

                    });
            });
        });

    });



});
