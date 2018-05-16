//** Connect to mongolab */
import mongoose from "mongoose";

const Shipment = mongoose.Schema({
    ref: {
        type: String,
        require: true
    },
    quote: {
        id: {
            type: String,
            require: true
        }
    },
    origin: {
        contact: {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            phone: {
                type: String,
                require: true
            }
        },
        address: {
            country_code: {
                type: String,
                require: true
            },
            locality: {
                type: String,
                require: true
            },
            postal_code: {
                type: String,
                require: true
            },
            address_line1: {
                type: String,
                require: true
            },
            organisation: {
                type: Boolean,
                require: true
            }
        }
    },
    destination: {
        contact: {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            phone: {
                type: String,
                require: true
            }
        },
        address: {
            country_code: {
                type: String,
                require: true
            },
            locality: {
                type: String,
                require: true
            },
            postal_code: {
                type: String,
                require: true
            },
            address_line1: {
                type: String,
                require: true
            },
            organisation: {
                type: Boolean,
                require: true
            }
        }
    },
    package: {
        dimensions: {
            height: {
                type: Number,
                require: true
            },
            width: {
                type: Number,
                require: true
            },
            length: {
                type: Number,
                require: true
            },
            unit: {
                type: String,
                require: true,
                default: "cm"
            },
        },
        grossWeight: {
            amount: {
                type: Number,
                require: true
            },
            unit: {
                type: String,
                require: true,
                default: "kg"
            }
        }
    }
},
{ 
    timestamps: true 
})

Shipment.methods.refNumber = function() {
    let ref = '';
    for(let i = 0; i < 10; i += 1) {
        ref += Math.floor(10 * Math.random());
    }

    // const ref = (10 ** 9) + Math.floor(Math.random() * (9 * (10 ** 9)));    
    this.ref = ref;
}

// Shipment.methods.createdTime = function() {
//     const date = new Date();

//     return date.toISOString();
// }

let Shipments = mongoose.model('Shipment', Shipment)
export default Shipments;