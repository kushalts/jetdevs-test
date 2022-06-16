import express, { Express, Request, Response, Application } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';
import * as db from './models';
import { errors } from 'celebrate';
import environmentConfig from './constants/environment.constant';
dotenv.config();
export class App {
  private app: Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', '*');
      response.header('Access-Control-Allow-Methods', '*');
      next();
    });
    this.app.use(routes);
    this.app.use(errors());
  }
  public async listen() {
    await db.sequelize.sync({ force: false });
    this.app.listen(environmentConfig.PORT, () => {
      console.log(`Server running on ${environmentConfig.PORT}`);
    });
    return this.app;
  }
}
