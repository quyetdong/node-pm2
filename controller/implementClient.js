const implementClient = {};

implementClient.getQuote = async (data, Collect, Quotes) => {
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
}

implementClient.creatShipment = async (data, Quotes, Shipments) => {
    try {
        let quote = await Quotes.findOne({ '_id': data.quote.id });
        let shipment = new Shipments(data);        
        const id = quote._id;

        shipment.quote.id = id;
        shipment.refNumber();

        const shipmentStored = await shipment.save();
        const created_at = shipmentStored.createdAt;
        
        const result = [{ ref: shipment.ref, created_at, cost: quote.cost }]

        return { data: result};
    } catch(err) {
        return { "Got Error": err.message };
    }
}

export default implementClient;