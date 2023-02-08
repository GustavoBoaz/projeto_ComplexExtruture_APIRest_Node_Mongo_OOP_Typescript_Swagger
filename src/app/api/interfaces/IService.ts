import { NextFunction, Request, Response } from 'express';

/**
 * @author Gustavo Boaz
 * @description Interface para implementar serviços CRUD
 * @argument I Corresponde a Interface dto de manipulação do modelo desejado
 * @argument D Corresponde a classe de dominio do modelo desejado
 */
interface IService<I, D> {
  create(dto: I): Promise<D>;
  readAll(): Promise<D[]>;
  readById(id: string): Promise<D>;
  update(id: string, dto: I): Promise<D>;
  delete(id: string): Promise<void>;

  isValidBody(req: Request, _res: Response, next: NextFunction): void;
}

export default IService;