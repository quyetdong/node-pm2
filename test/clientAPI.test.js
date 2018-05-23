import request from "supertest";
import test from "tape";
import app from "../server";
import implement from "../controller/implementClient";
import sinon from "sinon";

describe("Test API /getquote POST", () => {
  test("Test case successful", t => {
    const result = sinon.stub(implement, "getQuote");

    result.returns({
      data: [
        {
          id: "5b04ee4d700d9f0da84a8d5a",
          cost: 12.43
        }
      ]
    });

    request(app)
      .post("/client/getquote")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        var expectedResult = {
          data: [
            {
              id: "5b04ee4d700d9f0da84a8d5a",
              cost: 12.43
            }
          ]
        };

        t.same(res.body, expectedResult, "Result as expected");
        t.end();

        result.restore();
      });
  });
});
