import express from "express";
const Router = express.Router();
import client from "./client";

Router.use('/client', client);

export default Router;