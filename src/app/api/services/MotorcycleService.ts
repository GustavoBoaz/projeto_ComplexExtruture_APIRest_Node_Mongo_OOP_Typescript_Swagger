import { NextFunction, Request, Response } from 'express';
import Motorcycle from '../domains/Motorcycle';
import BodyNotFound from '../errors/BodyNotFound';
import IdNotFoundError from '../errors/IdNotFoundError';
import IMotorcycle from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';
import MotorcycleODM from '../models/MotorcycleODM';

const ID_NOT_FOUND = 'Motorcycle not found';

class MotorcycleService implements IService<IMotorcycle, Motorcycle> {
  protected odm: MotorcycleODM = new MotorcycleODM();

  async create(dto: IMotorcycle): Promise<Motorcycle> {
    const motorcycle = await this.odm.create(dto);
    return new Motorcycle(motorcycle);
  }

  async readAll(): Promise<Motorcycle[]> {
    const motorcycles = await this.odm.find();
    return motorcycles.map((motorcycle) => new Motorcycle(motorcycle));
  }

  async readById(id: string): Promise<Motorcycle> {
    const motorcycles = await this.odm.findById(id);
    if (!motorcycles) throw new IdNotFoundError(ID_NOT_FOUND);
    return new Motorcycle(motorcycles);
  }

  async update(id: string, dto: IMotorcycle): Promise<Motorcycle> {
    const motorcycles = await this.odm.update(id, dto);
    if (!motorcycles) throw new IdNotFoundError(ID_NOT_FOUND);
    return new Motorcycle(motorcycles);
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
     * @param mot IMotorcycle
     * @throws BodyNotFound
     * @see IMotorcycle
     * @see BodyNotFound
     */
    function isValidVehicle(mot: IMotorcycle): void {
      if (!mot.model || !mot.year || !mot.color || !mot.buyValue) {
        throw new BodyNotFound('Body not found Vehicle');
      }
    }

    /**
     * @author Gustavo Boaz
     * @description Função auxiliar de método, esta função valida
     * os valores de motorcycle parassado na requisição. Esta função
     * é acessada apenas através o escopo do método;
     * @param mot IMotorcycle
     * @throws BodyNotFound
     * @see IMotorcycle
     * @see BodyNotFound
     */
    function isValidMotorcycle(mot: IMotorcycle): void {
      if (!mot.category || !mot.engineCapacity) {
        throw new BodyNotFound('Body not found Motorcycle');
      }
    }

    const mot: IMotorcycle = {
      ...req.body,
    } as IMotorcycle;
    isValidVehicle(mot);
    isValidMotorcycle(mot);
    next();
  }
}

export default MotorcycleService;