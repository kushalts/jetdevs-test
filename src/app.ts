import express, { Express, Request, Response, Application } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';
import * as db from './models';
import environmentConfig from './constants/environment.constant';
dotenv.config();
export class App {
  private app: Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(routes);
  }
  public listen() {
    db.sequelize.sync({ force: false }).then(() => {
      this.app.listen(environmentConfig.PORT, () => {
        console.log(`Server running on ${environmentConfig.PORT}`);
      });
    });
  }
}
