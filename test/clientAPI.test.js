import sinon from "sinon";
import chai from "chai";
import request from "superagent";
import implement from "../controller/implementClient";
import object from "./data/data.json";

const should = chai.should();
const base = "http://localhost:3000";

describe("routes: client", () => {
  describe("POST /getquote", () => {
    it("should return the added item", done => {
      const result = sinon.stub(implement, "getQuote");

      result.returns({
        data: [
          {
            id: "5b04ee4d700d9f0da84a8d5a",
            cost: 12.43
          }
        ]
      });

      const options = {
        body: object.getquoteRequest,
        json: true,
        url: `${base}/client/getquote`
      };

      request
        .post(options.url)
        .send(options.body)
        .end((err, res) => {
          should.not.exist(err);
          res.statusCode.should.eql(200);
          res.header["content-type"].should.contain("application/json");
          res.body.data[0].should.include.keys("id", "cost");

          done();
        });
    });
  });
});
