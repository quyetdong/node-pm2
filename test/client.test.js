// During the test the env variable is set to test
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Rates = require("../model/Rates");

// Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

const should = chai.should();

chai.use(chaiHttp);

// Our parent block
// describe('Rates', () => {
// beforeEach((done) => {  // Before each test we empty the database

//     Rates.remove({}, (err) => {
//         done();
//     });
// });

/**
 * Test the /Get route
 */
describe("/POST getquote", () => {
  it("it should POST", done => {
    const rate = {
      data: {
        origin: {
          contact: {
            name: "La Redoute Contact",
            email: "laredoute@example.com",
            phone: "07 1234 5678"
          },
          address: {
            country_code: "FR",
            locality: "Anzin",
            postal_code: "59410",
            address_line1: "Rue Jean Jaures"
          }
        },
        destination: {
          contact: {
            name: "Marquise de Pompadour",
            email: "marquise-de-pompadour@example.com",
            phone: "07 9876 5432"
          },
          address: {
            country_code: "FR",
            locality: "Marseille",
            postal_code: "13006",
            address_line1: "175 Rue de Rome"
          }
        },
        package: {
          dimensions: {
            height: 10,
            width: 10,
            length: 10,
            unit: "cm"
          },
          grossWeight: {
            amount: 100,
            unit: "kg"
          }
        }
      }
    };

    chai
      .request(server)
      .post("/client/getquote")
      .send(rate)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.data.should.have.property("id");
        res.body.data.should.have.property("cost").eql(100);
        done();
      });
  });
});
