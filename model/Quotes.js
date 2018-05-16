//** Connect to mongolab */
import mongoose from "mongoose";

const Quote = mongoose.Schema({
    "amount": {
        type: Number,
        require: true
    }
})

let Quotes = mongoose.model('Quote', Quote)
export default Quotes;