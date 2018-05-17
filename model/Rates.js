//** Connect to mongolab */
import mongoose from "mongoose";

const Rate = new mongoose.Schema({
    grossWeight: {
        amount: {
            type: Number,
            require: true
        },
        unit: {
            type: String,
            require: true,
            default: 'g'
        }
    },
    price: {
        price: {
            type: Number,
            require: true
        },
        unit: {
            type: String,
            require: true,
            default: 'USD'
        }
    },
    origin: {
        country_code: {
            type: String,
            require: true
        }        
    },
    destination: {
        country_code: {
            type: String,
            require: true
        }
    }
})

let Rates = mongoose.model('Rate', Rate)
export default Rates;