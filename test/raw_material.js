//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Raw_material = require("../models/Raw_material");
let Supplier = require("../models/Supplier");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Raw_material", () => {
    before((done) => {
        //Before each test we empty the database
        Raw_material.remove({}, (err) => {
            // done();
        });
        Supplier.remove({}, (err) => {
            done();
        });
    });

    after((done) => {
        //after each test we empty the database
        Raw_material.remove({}, (err) => {
            // done();
        });
        Supplier.remove({}, (err) => {
            done();
        });
    });


    /*
     * Test the /GET route
     */
    describe("/GET raw_material", () => {
        it("it should GET all the raw_materials", (done) => {
            chai
                .request(server)
                .get("/api/raw_material")
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
    describe('/POST raw_material', () => {
        it('it should not POST a raw_material with unknown Supplier', (done) => {
            let raw_material = {
                name: "Nitrogen",
                quantity: "178",
                unit: "kgs",
                supplier_name: "Naman Patidar"
            }
            chai.request(server)
                .post("/api/raw_material")
                .send(raw_material)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg');
                    res.body.should.have.property('msg').eql('supplier not found');
                    done();
                });
        });

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
                    done();
                });
        });

        it('it should POST a raw_material', (done) => {
            let raw_material2 = {
                name: "Nitrogen",
                quantity: "178",
                unit: "Kgs",
                supplier_name: "Naman Patidar"

            }
            chai.request(server)
                .post("/api/raw_material")
                .send(raw_material2)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    /*
      * Test the /PUT route
      */
    describe('/PUT raw_material/:id', () => {

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
                    done();
                });
        });

        it('Edit function of raw_material is being checked', (done) => {
            let raw_material = new Raw_material({
                name: "Nitrogen",
                quantity: "178",
                unit: "Kgs",
                supplier_name: "Naman Patidar"

            })
            raw_material.save((err, raw_material) => {
                chai.request(server)
                    .put('/api/raw_material/' + raw_material.id)
                    .send({ name: "Potassium", quantity: "175", unit: "Kgs", supplier_name: "Naman Patidar" })
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            should.exist(res);
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name').eql('Potassium');
                            res.body.should.have.property('quantity').eql(175);
                            done();
                        }

                    });
            });
        });

    });


    /*
      * Test the /DELETE route
      */
    describe('/DELETE raw_material/:id', () => {

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
                    done();
                });
        });

        it('Delete function of raw_material is being checked', (done) => {
            let raw_material = new Raw_material({
                name: "Nitrogen",
                quantity: "178",
                unit: "Kgs",
                supplier_name: "Naman Patidar"

            })
            raw_material.save((err, raw_material) => {
                chai.request(server)
                    .delete('/api/raw_material/' + raw_material.id)
                    .send({})
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            should.exist(res);
                            res.should.have.status(200);
                            res.body.should.have.property('msg').eql('raw_material removed');
                            done();
                        }
                    });
            });
        });

    });
});
