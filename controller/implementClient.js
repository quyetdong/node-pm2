//* Make object to save methods for processing with client */
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
    if (
      !data.origin.address.country_code ||
      !data.destination.address.country_code ||
      !data.package.grossWeight.amount
    ) {
      return {
        Message:
          'Origin country, destination country, weight fields are required!',
      };
    }

    if (data.package.grossWeight.unit !== 'kg') {
      return { Message: 'Weight unit must be kg (kilogram)' };
    }

    if (
      !+data.package.grossWeight.amount ||
      +data.package.grossWeight.amount <= 0
    ) {
      return { Message: 'Weight field Type Error' };
    }

    const weightAmount = data.package.grossWeight.amount * 1000;

    try {
      let rate = await Collect.findOne(
        {
          'origin.country_code': data.origin.address.country_code,
          'destination.country_code': data.destination.address.country_code,
          'grossWeight.amount': { $gte: weightAmount },
        },
        'price.price',
      ).sort({ 'grossWeight.amount': 1 });

      if (!rate) {
        rate = await Collect.findOne(
          {
            'origin.country_code': data.origin.address.country_code,
            'destination.country_code': data.destination.address.country_code,
          },
          'price.price',
        ).sort({ 'grossWeight.amount': -1 });
      }

      const quote = new Quotes();
      quote.cost = rate.price.price;

      const result = await quote.save();

      return { data: [{ id: result._id, cost: result.cost }] };
    } catch (e) {
      return { 'Got error': e.message };
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
      const quote = await Quotes.findOne({ _id: data.quote.id });
      const shipment = new Shipments(data);
      const id = quote._id;

      shipment.quote.id = id;
      shipment.refNumber();

      const shipmentStored = await shipment.save();
      const created_at = shipmentStored.createdAt;

      const result = [{ ref: shipment.ref, created_at, cost: quote.cost }];

      return { data: result };
    } catch (err) {
      return { 'Got Error': err.message };
    }
  },

  /**
   * Get shipment
   *
   * @param {any} ref
   * @param {any} Shipments
   */
  async getShipment(ref, Shipments) {
    try {
      const shipment = await Shipments.findOne({ ref }).select({
        ref: 1,
        origin: 1,
        destination: 1,
        package: 1,
        _id: 0,
      });

      if (!shipment) {
        return { data: { ref: '' } };
      }

      return { data: shipment };
    } catch (e) {
      return { 'Got error': e.message };
    }
  },

  /**
   *
   *
   * @param {any} ref
   * @param {any} Shipments
   * @returns
   */
  async deleteShipment(ref, Shipments) {
    const data = [];

    try {
      const removedShipment = await Shipments.remove({ ref });

      if (removedShipment.n) {
        data[0] = { status: 'OK', message: 'Shipment has been deleted' };
      } else {
        data[0] = { status: 'NOK', message: 'Shipment not found' };
      }

      return { data };
    } catch (e) {
      console.log(e.message);
      data[0] = { status: 'NOK', message: 'Shipment not found' };

      return { data };
    }
  },

  /**
   *
   *
   * @param {any} Rates
   * @returns
   */
  async getAllRate(Rates) {
    try {
      const rates = await Rates.find({}).select({
        grossWeight: 1,
        price: 1,
        origin: 1,
        destination: 1,
        _id: 0,
      });

      return rates;
    } catch (err) {
      return { 'Got error': err.message };
    }
  },
};

export default implementClient;
