//** Connect to mongolab */
import mongoose from "mongoose";

const Quote = new mongoose.Schema({
    "cost": {
        type: Number,
        require: true
    }
})

let Quotes = mongoose.model('Quote', Quote)
export default Quotes;