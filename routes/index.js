import express from 'express';
import client from './client';

const Router = express.Router();

//* * Direct request from /client to client */
Router.use('/client', client);

export default Router;
