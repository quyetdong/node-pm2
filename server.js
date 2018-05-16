//** Import Modules */
import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//** Declare variables */
const url='mongodb://userdb1:studydb18@ds119160.mlab.com:19160/quyetdongdb';
const app = express();

// User bodyParser
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())

//** Set port */
const PORT = process.env.PORT || 3000;
mongoose.connect(url);

app.use('/', routes);

app.listen(PORT, () => {
    console.log('running');
});