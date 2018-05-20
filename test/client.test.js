// Require the dev-dependencies
import { should as _should, use, request, expect } from "chai";
import chaiHttp from "chai-http";
import server from "../server";
import implement from "../controller/implementClient";
import Quotes from "../model/Quotes";
import Rates from "../model/Rates";
import { data } from "./data/data";
import sinon from "sinon";

let should = _should();
use(chaiHttp);

/**
 * Test the /Get route
 */
describe("/POST getquote", () => {
  it("it should POST", async () => {
    const getquote = implement.getQuote;

    sinon.addBehavior("sort", fake => fake.returns({ price: { price: 100 } }));

    sinon.addBehavior("save", fake => fake.returns({ _id: "abc", cost: 100 }));
    let quote = sinon.createStubInstance(Quotes);
    quote.save();

    const res = await getquote(data[0].getquoteRequset.data, Rates, Quotes);

    expect(res).to.have.own.property("data");
    expect(res.data).to.be.an("array");
    expect(res.data).to.have.lengthOf(1);
    expect(res.data[0]).to.have.all.keys("id", "cost");
    expect(res.data[0].cost).to.equal(100);
  });
});
