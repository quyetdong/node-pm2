import express from "express";
const Router = express.Router();

import api from "./api";
Router.use('/', api);

export default Router;