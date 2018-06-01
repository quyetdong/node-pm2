//* * Import Modules */
import express from 'express';
import Rates from '../model/Rates';
import Quotes from '../model/Quotes';
import Shipments from '../model/Shipments';
import implementClient from '../controller/implementClient';
import logger from '../config/winston1';

const Router = express.Router();

//* * Response to Post and get to /client */
Router.post('/', async (req, res) => {
  const rate = new Rates(req.body);

  try {
    const result = await rate.save();
    logger.info('successful');
    return res.json(result);
  } catch (err) {
    logger.error(err);
    return res.json({ 'Got Error': 'Cannot save' });
  }
}).get('/', async (req, res) => {
  try {
    const rates = await implementClient.getAllRate(Rates);
    return res.json({ data: rates });
  } catch (err) {
    logger.error(err);
    return res.json({ 'Got Error': 'Cannot get data' });
  }
});

//* * Response to Post Request to /client/getQuote */
Router.post('/getquote', async (req, res) => {
  try {
    const { data } = req.body;

    const getquote = await implementClient.getQuote(data, Rates, Quotes);

    logger.info('Get quote executed!');
    return res.status(201).json(getquote);
  } catch (e) {
    logger.error(e);
    return res.json({ 'Got error': 'Cannot get quote' });
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
    logger.error(e);
    return res.json({ 'Got error': 'Cannot create shipment' });
  }
});

/** Get shipment */
Router.get('/getshipment', async (req, res) => {
  try {
    const { ref } = req.query;

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
