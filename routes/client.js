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
  try {
    const { data } = req.body;

    const getquote = await implementClient.getQuote(data, Rates, Quotes);

    return res.json(getquote);
  } catch (e) {
    return res.json({ 'Got error': e.message });
  }
});

//* * Execute to Post Request to /client/creatshipment */
Router.post('/creatshipment', async (req, res) => {
  try {
    const { data } = req.body;

    const shipmentCreated = await implementClient.creatShipment(
      data,
      Quotes,
      Shipments,
    );

    return res.json(shipmentCreated);
  } catch (e) {
    return res.json({ 'Got error': e.message });
  }
});

/** Get shipment */
Router.post('/getshipment', async (req, res) => {
  try {
    const { ref } = req.body.data;

    const shipmentFound = await implementClient.getShipment(ref, Shipments);

    return res.json(shipmentFound);
  } catch (e) {
    return res.json({ 'Got error': e.message });
  }
});

/** Delete Shipment */
Router.delete('/deleteshipment', async (req, res) => {
  try {
    const { ref } = req.body.data;

    const removedMessage = await implementClient.deleteShipment(ref, Shipments);

    return res.json(removedMessage);
  } catch (e) {
    return res.json({ 'Got error': e.message });
  }
});

export default Router;
