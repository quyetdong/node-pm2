const getquoteRequset = {
  data: {
    origin: {
      contact: {
        name: "La Redoute Contact",
        email: "laredoute@example.com",
        phone: "07 1234 5678"
      },
      address: {
        country_code: "FR",
        locality: "Anzin",
        postal_code: "59410",
        address_line1: "Rue Jean Jaures"
      }
    },
    destination: {
      contact: {
        name: "Marquise de Pompadour",
        email: "marquise-de-pompadour@example.com",
        phone: "07 9876 5432"
      },
      address: {
        country_code: "FR",
        locality: "Marseille",
        postal_code: "13006",
        address_line1: "175 Rue de Rome"
      }
    },
    package: {
      dimensions: {
        height: 10,
        width: 10,
        length: 10,
        unit: "cm"
      },
      grossWeight: {
        amount: 100,
        unit: "kg"
      }
    }
  }
};

const getquoteRespone = {
  data: [
    {
      id: "__QUOTE_ID__",
      amount: 100
    }
  ]
};

export const data = [
  {
    getquoteRequset,
    getquoteRespone
  }
];
