//* Import Modules */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from 'config';
import routes from './routes';
import logger from './config/winston1';

const app = express();

//* Set PORT */
const PORT = process.env.PORT || 3000;

//* Connect database */
// const url = "mongodb://userdb1:studydb18@ds119160.mlab.com:19160/quyetdongdb"
mongoose.connect(config.DBHost);

//* Run app */
// User bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Direct app to routes
app.use('/', routes);

//* Listen for request at PORT */
app.listen(PORT, () => {
  logger.info('server running');
});

export default app;
