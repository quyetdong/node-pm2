//** Import Modules */
import express from "express";
import Rates from '../model/Rates';
import Quotes from '../model/Quotes';
import Shipments from '../model/Shipments'
import implementClient from '../controller/implementClient'

const Router = express.Router();

Router.post('/', async (req, res, next) => {
    const rate = new Rates(req.body);

    try {
        const result = await rate.save();
        return res.json(result);
    } catch (err) {
        return res.json({ "Got Error": err.message });
    }
}).get('/', async (req, res, next) => {
    try {
        const rates = await Rates.find({})

        return res.json({ data: rates });
    } catch (err) {
        return res.json({ 'Got error': err.message })
    }
})

Router.post('/getquote', async (req, res) => {
    
    const { data } = req.body;

    const getquote = await implementClient.getQuote(data, Rates, Quotes);

    return res.json(getquote);
})

Router.post('/creatshipment', async (req, res) => {
    
    const { data } = req.body;

    const getShipment = await implementClient.creatShipment(data, Quotes, Shipments);

    return res.json(getShipment);
})

export default Router;