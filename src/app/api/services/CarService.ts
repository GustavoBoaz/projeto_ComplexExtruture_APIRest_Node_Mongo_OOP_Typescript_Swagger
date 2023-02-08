import { NextFunction, Request, Response } from 'express';
import Car from '../domains/Car';
import BodyNotFound from '../errors/BodyNotFound';
import IdNotFoundError from '../errors/IdNotFoundError';
import ICar from '../interfaces/ICar';
import IService from '../interfaces/IService';
import CarODM from '../models/CarODM';

const ID_NOT_FOUND = 'Car not found';

class CarService implements IService<ICar, Car> {
  protected odm: CarODM = new CarODM();

  async create(dto: ICar): Promise<Car> {
    const car = await this.odm.create(dto);
    return new Car(car);
  }

  async readAll(): Promise<Car[]> {
    const cars = await this.odm.find();
    return cars.map((car) => new Car(car));
  }

  async readById(id: string): Promise<Car> {
    const car = await this.odm.findById(id);
    if (!car) throw new IdNotFoundError(ID_NOT_FOUND);
    return new Car(car);
  }
  
  async update(id: string, dto: ICar): Promise<Car> {
    const car = await this.odm.update(id, dto);
    if (!car) throw new IdNotFoundError(ID_NOT_FOUND);
    return new Car(car);
  }

  async delete(id: string): Promise<void> {
    await this.readById(id);
    await this.odm.delete(id);
  }

  isValidBody(req: Request, _res: Response, next: NextFunction): void {
    /**
     * @author Gustavo Boaz
     * @description Função auxiliar de método, esta função valida
     * os valores de veículos parassado na requisição. Esta função
     * é acessada apenas através o escopo do método;
     * @param car IMotorcycle
     * @throws BodyNotFound
     * @see ICar
     * @see BodyNotFound
     */
    function isValidVehicle(car: ICar): void {
      if (!car.model || !car.year || !car.color || !car.buyValue) {
        throw new BodyNotFound('Body not found Vehicle');
      }
    }
  
    /**
     * @author Gustavo Boaz
     * @description Função auxiliar de método, esta função valida
     * os valores de motorcycle parassado na requisição. Esta função
     * é acessada apenas através o escopo do método;
     * @param car ICar
     * @throws BodyNotFound
     * @see IMotorcycle
     * @see BodyNotFound
     */
    function isValidCar(car: ICar): void {
      if (!car.doorsQty || !car.seatsQty) {
        throw new BodyNotFound('Body not found Car');
      }
    }
    
    const car: ICar = {
      ...req.body,
    } as ICar;
    isValidVehicle(car);
    isValidCar(car);
    next();
  }
}

export default CarService;