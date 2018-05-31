// Require the dev-dependencies
import { should as _should, use, expect } from "chai";
import chaiHttp from "chai-http";
import implement from "../controller/implementClient";
import Quotes from "../model/Quotes";
import Rates from "../model/Rates";
import data from "./data/data.json";
import sinon from "sinon";
import mongoose from "mongoose";

const should = _should();
use(chaiHttp);

/**
 * Test the POST /client/getquote route
 */
describe("Test method getquote", () => {
  const getquote = implement.getQuote;
  const originData = data.getquoteRequest.data;
  const rateStub = sinon.stub(mongoose.Model, "findOne");
  const quoteStub = sinon.stub(mongoose.Model.prototype, "save");
  const mockFind = {
    where: () => mockFind,
    gte: () => mockFind,
    sort: () => mockFind,
    exec: () => mockFind
  };

  before(() => {});
  after(() => {
    rateStub.restore();
    quoteStub.restore();
  });

  it("it test getquote POST: rate not found", async () => {
    const data1 = JSON.parse(JSON.stringify(originData));
    data1.origin.address.country_code = "";
    mockFind.exec = () => null;

    rateStub.returns(mockFind);
    quoteStub.returns({});

    const res = await getquote(data1, Rates, Quotes);

    expect(res).to.have.own.property("Message");
    expect(res.Message).to.equal("Not found");
  });

  it("it test getquote POST: getquote succeeded", async () => {
    const data2 = JSON.parse(JSON.stringify(originData));
    data2.package.grossWeight.amount = 1;
    mockFind.exec = () => ({ price: { price: 15.42 } });

    rateStub.returns(mockFind);
    quoteStub.returns({ _id: "123", cost: 15.42 });

    const res = await getquote(data2, Rates, Quotes);

    expect(res).to.have.own.property("data");
    expect(res.data).to.be.an("array");
    expect(res.data).to.have.lengthOf(1);
    expect(res.data[0]).to.have.all.keys("id", "cost");
    expect(res.data[0].cost).to.equal(15.42);
  });

  it("it test getquote POST: getquote validation failed", async () => {
    const data2 = JSON.parse(JSON.stringify(originData));
    data2.destination.address.country_code = undefined;
    mockFind.exec = () => null;

    rateStub.returns(mockFind);
    quoteStub.returns(null);

    const res = await getquote(data2, Rates, Quotes);

    expect(res).to.have.own.property("Message");
    expect(res.Message).to.equal("Request data is not correct!");
  });
});
