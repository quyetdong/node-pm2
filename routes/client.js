//* * Import Modules */
import express from 'express';
import Rates from '../model/Rates';
import Quotes from '../model/Quotes';
import Shipments from '../model/Shipments';
import implementClient from '../controller/implementClient';

const Router = express.Router();

//* * Response to Post and get to /client */
Router.post('/', async (req, res) => {
  const rate = new Rates(req.body);

  try {
    const result = await rate.save();
    return res.json(result);
  } catch (err) {
    return res.json({ 'Got Error': err.message });
  }
}).get('/', async (req, res) => {
  try {
    const rates = await implementClient.getAllRate(Rates);
    return res.json({ data: rates });
  } catch (e) {
    return res.json({ Error: e.message });
  }
});

//* * Response to Post Request to /client/getQuote */
Router.post('/getquote', async (req, res) => {
  const { data } = req.body;

  const getquote = await implementClient.getQuote(data, Rates, Quotes);

  return res.json(getquote);
});

//* * Execute to Post Request to /client/creatshipment */
Router.post('/creatshipment', async (req, res) => {
  const { data } = req.body;

  const getShipment = await implementClient.creatShipment(
    data,
    Quotes,
    Shipments,
  );

  return res.json(getShipment);
});

export default Router;
