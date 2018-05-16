//** Import Modules */
import express from "express";
const Router = express.Router();
import Rates from '../../model/Rates';
import Quotes from '../../model/Quotes';

Router.post('/', async (req, res, next) => {
    const rate = new Rates();

    const { data } = req.body;

    rate.grossWeight.amount = data.grossWeight.amount;
    rate.grossWeight.unit = data.grossWeight.unit;

    rate.price.price = data.price.price;
    rate.price.unit = data.price.unit;

    rate.origin.country_code = data.origin.country_code;
    rate.destination.country_code = data.destination.country_code;

    try {
        const result = await rate.save();
        return res.json(result);
    } catch (err) {
        return res.json({ "Got Error": err.message });
    }
}).get('/', (req, res, next) => {
    Rates.find({ 'grossWeight.amount': 500 })
        .select('grossWeight price origin destination')
        .exec((err, data) => {
            console.log(err, data);

            if (err) return res.json(err);
            return res.json({ data: data });
        })
})

Router.post('/getquote', async (req, res, next) => {
    const { data } = req.body;

    if(data.package.grossWeight.unit !== 'kg') {
        return res.json({ Message: "Weight unit must be kg (kilogram)" })
    }

    data.package.grossWeight.amount *= 1000; 

    Rates.findOne({
        'origin.country_code': data.origin.address.country_code,
        'destination.country_code': data.destination.address.country_code,
        'grossWeight.amount': {$lte: data.package.grossWeight.amount}
    })
    .exec(async (err, rate) => {
        const quote = new Quotes();

        quote.amount = rate.price.price;
        
        try {
            const result = await quote.save();

            const quoteResult = { id: result._id, amount: result.amount };

            return res.json({data: quoteResult});
        } catch(err) {
            return res.json({ "Got error": err.message });
        }       
    })
})

export default Router;