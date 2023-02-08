import 'express-async-errors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../swagger-output.json';

import CarController from './api/controllers/CarController';
import MotorcycleController from './api/controllers/MotorcycleController';
import ErrorHandler from './api/middlewares/ErrorHandler';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.initAuthHeader();
    this.initRoutes();
    this.initMiddlewares();
  }

  /**
   * Este método configura acesso de entrada a sua api
   */
  private initAuthHeader(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  /**
   * Inicialize middlewares aqui
   */
  private initMiddlewares(): void {
    this.app.use(ErrorHandler.handle);
  }

  /**
   * Inicialize rotas aqui
   */
  private initRoutes(): void {
    this.app.use(new CarController().initRoutes());
    this.app.use(new MotorcycleController().initRoutes());
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;