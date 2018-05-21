// Require the dev-dependencies
import { should as _should, use, request, expect } from "chai";
import chaiHttp from "chai-http";
// import server from '../server';
import implement from "../controller/implementClient";
import Quotes from "../model/Quotes";
import Rates from "../model/Rates";
import { data } from "./data/data";
import sinon from "sinon";
import mongoose from "mongoose";

const should = _should();
use(chaiHttp);
const base = "http://localhost:3000";

/**
 * Test the POST /client/getquote route
 */
describe("Test method getquote", () => {
  it("should return response data", async () => {});

  it("it test getquote POST", async () => {
    const getquote = implement.getQuote;

    const rateStub = sinon.stub(mongoose.Model, "findOne");
    rateStub.returns({
      sort: sinon.stub().returns({ price: { price: 80 } })
    });

    const quoteStub = sinon.stub(mongoose.Model.prototype, "save");
    quoteStub.returns({ _id: "123", cost: 100 });

    const res = await getquote(data[0].getquoteRequset.data, Rates, Quotes);
    // quoteStub.restore();

    expect(res).to.have.own.property("data");
    expect(res.data).to.be.an("array");
    expect(res.data).to.have.lengthOf(1);
    expect(res.data[0]).to.have.all.keys("id", "cost");
    expect(res.data[0].cost).to.equal(100);
  });
});
