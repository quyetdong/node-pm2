//** Make object to save methods for processing with client */
const implementClient = {
    /**
     * Get Quote method
     * 
     * @param {any} data 
     * @param {any} Collect 
     * @param {any} Quotes: save quote data into Quote 
     * @returns quote data
     */
    async getQuote(data, Collect, Quotes) {
        if (!data.origin.address.country_code || !data.destination.address.country_code
            || !data.package.grossWeight.amount) {
            return { Message: "Origin country, destination country, weight fields are required!" }
        }

        if (data.package.grossWeight.unit !== 'kg') {
            return { Message: "Weight unit must be kg (kilogram)" };
        }

        if (!+data.package.grossWeight.amount || +data.package.grossWeight.amount <= 0) {
            return { Message: "Weight field Type Error" }
        }

        const weightAmount = data.package.grossWeight.amount * 1000;

        try {
            let rate = await Collect.findOne({
                'origin.country_code': data.origin.address.country_code,
                'destination.country_code': data.destination.address.country_code,
                'grossWeight.amount': { $gte: weightAmount }
            }, 'grossWeight.amount price.price').sort({ 'grossWeight.amount': 1 });

            if (!rate) {
                rate = await Collect.findOne({
                    'origin.country_code': data.origin.address.country_code,
                    'destination.country_code': data.destination.address.country_code
                }, 'grossWeight.amount price.price').sort({ 'grossWeight.amount': -1 });
            }

            const quote = new Quotes();
            quote.cost = rate.price.price;

            const result = await quote.save();

            return { data: [{ id: result._id, cost: result.cost }] };
        } catch (e) {
            return { "Got error": e.message };
        }
    },


    /**
     * Create Shipment method
     * 
     * @param {any} data 
     * @param {any} Quotes 
     * @param {any} Shipments 
     * @returns [{ ref, cost }]
     */
    async creatShipment(data, Quotes, Shipments) {
        try {
            let quote = await Quotes.findOne({ '_id': data.quote.id });
            let shipment = new Shipments(data);
            const id = quote._id;

            shipment.quote.id = id;
            shipment.refNumber();

            const shipmentStored = await shipment.save();
            const created_at = shipmentStored.createdAt;

            const result = [{ ref: shipment.ref, created_at, cost: quote.cost }]

            return { data: result };
        } catch (err) {
            return { "Got Error": err.message };
        }
    },

    async getAllRate(Rates) {
        try {
            const rates = await Rates.find({})

            let models = [];
            
            rates.forEach((e) => {
                let {
                    grossWeight: {
                        amount,
                        unit: weight_unit
                    },
                    price: {
                        price,
                        unit
                    },
                    origin: {
                        country_code: origin_country
                    },
                    destination: {
                        country_code: dest_country
                    }
                } = e;

                let model = {
                    grossWeight: {
                        amount,
                        unit: weight_unit
                    },
                    price: {
                        price,
                        unit
                    },
                    origin: {
                        country_code: origin_country
                    },
                    destination: {
                        country_code: dest_country
                    }
                }

                models.push(model);
            })
            return models;
        } catch (err) {
            return { 'Got error': err.message };
        }
    }
}

export default implementClient;