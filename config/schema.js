export const getQuoteSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Validate request data in getQuote',
  type: 'object',
  definitions: {
    customer_information: {
      type: 'object',
      properties: {
        contact: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            phone: {
              type: 'string',
            },
          },
        },
        address: {
          type: 'object',
          properties: {
            country_code: {
              type: 'string',
            },
            locality: {
              type: 'string',
            },
            postal_code: {
              type: 'string',
            },
            address_line1: {
              type: 'string',
            },
          },
          required: ['country_code'],
        },
      },
    },
  },
  properties: {
    origin: { $ref: '#/definitions/customer_information' },
    destination: { $ref: '#/definitions/customer_information' },
    package: {
      type: 'object',
      properties: {
        dimensions: {
          type: 'object',
          properties: {
            height: { type: 'number' },
            width: { type: 'number' },
            length: { type: 'number' },
            unit: { type: 'string' },
          },
        },
        grossWeight: {
          type: 'object',
          properties: {
            amount: {
              type: 'number',
              exclusiveMinimum: 0,
            },
            unit: {
              type: 'string',
              pattern: '^kg$',
            },
          },
          required: ['amount', 'unit'],
        },
      },
      required: ['grossWeight'],
    },
  },
  required: ['origin', 'destination', 'package'],
};

const fCreatShipmentSchema = JSON.parse(JSON.stringify(getQuoteSchema));
fCreatShipmentSchema.title = 'First validation creatShipment';
fCreatShipmentSchema.definitions.customer_information.required = [
  'contact',
  'address',
];
fCreatShipmentSchema.definitions.customer_information.properties.contact.required = [
  'name',
  'email',
  'phone',
];
fCreatShipmentSchema.definitions.customer_information.properties.address.required = [
  'country_code',
  'locality',
  'postal_code',
  'address_line1',
];
fCreatShipmentSchema.properties.package.required = [
  'dimensions',
  'grossWeight',
];
fCreatShipmentSchema.properties.package.properties.dimensions.required = [
  'height',
  'width',
  'length',
  'unit',
];

export { fCreatShipmentSchema };

export const sCreatShipmentSchema = {
  title: 'Second validation for creatShipment request data',
  type: 'object',
  properties: {
    quote: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    origin: {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            organisation: { type: 'boolean' },
          },
          required: ['organisation'],
        },
      },
      required: ['address'],
    },
    destination: {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            organisation: { type: 'boolean' },
          },
          required: ['organisation'],
        },
      },
      required: ['address'],
    },
  },
  required: ['quote', 'origin', 'destination'],
};
