import express from "express";
import client from "./client";

const Router = express.Router();

Router.use('/client', client);

export default Router;