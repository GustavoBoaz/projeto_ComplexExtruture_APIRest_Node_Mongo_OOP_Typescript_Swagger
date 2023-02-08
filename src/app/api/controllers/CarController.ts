import express, { Request, Response } from 'express';
import Car from '../domains/Car';
import ICar from '../interfaces/ICar';
import IService from '../interfaces/IService';
import CarService from '../services/CarService';
import AbstractController from './AbstractController';

class CarController extends AbstractController<IService<ICar, Car>> {
  constructor() {
    super(new CarService());
  }

  private async create(req: Request, res: Response): Promise<Response> {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  }

  private async readAll(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readAll();
    return res.status(200).json(result);
  }

  private async readById(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readById(req.params.id);
    return res.status(200).json(result);
  }

  private async update(req: Request, res: Response): Promise<Response> {
    const result = await this.service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  private async delete(req: Request, res: Response): Promise<Response> {
    await this.service.delete(req.params.id);
    return res.status(204).send();
  }

  initRoutes(): express.Router {
    this.router.post('/cars', this.service.isValidBody, (req, res) =>
      // #swagger.tags = ['Car']
      // #swagger.summary = 'Criar Car'
      // #swagger.description = 'Endpoint para criar um Car.'

      /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Car data.',
        required: true,
        schema: { $ref: "#/definitions/Car" },
      } */

      /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/Car" },
        description: 'Car criado!.' 
      } */

      /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/BodyNotFound" },
        description: 'Erro no corpo da requisição!.' 
      } */
      this.create(req, res)
    );

    this.router.get('/cars', (req, res) =>
      // #swagger.tags = ['Car']
      // #swagger.summary = 'Listar Cars'
      // #swagger.description = 'Endpoint para listar Cars.'

      /* #swagger.responses[200] = { 
        description: 'Lista de Car!.' 
      } */
      this.readAll(req, res)
    );

    this.router.get('/cars/:id', (req, res) =>
      // #swagger.tags = ['Car']
      // #swagger.summary = 'Listar Car'
      // #swagger.description = 'Endpoint para listar Car.'

      /* #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Car ID.'
      } */

      /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Car" },
        description: 'Car encontrado!.' 
      } */

      /* #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/IdNotFoundError" },
        description: 'Car não encontrado!.' 
      } */

      /* #swagger.responses[422] = { 
        schema: { $ref: "#/definitions/IdInvalidError" },
        description: 'Id mal formatado!.' 
      } */
      this.readById(req, res)
    );

    this.router.put('/cars/:id', this.service.isValidBody, (req, res) =>
      // #swagger.tags = ['Car']
      // #swagger.summary = 'Atualizar Car'
      // #swagger.description = 'Endpoint para atualizar um Car.'

      /* #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Car ID.'
      } */

      /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Car data.',
        required: true,
        schema: { $ref: "#/definitions/Car" },
      } */

      /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Car" },
        description: 'Car Alterado!.' 
      } */

      /* #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/IdNotFoundError" },
        description: 'Car não encontrado!.' 
      } */

      /* #swagger.responses[422] = { 
        schema: { $ref: "#/definitions/IdInvalidError" },
        description: 'Id mal formatado!.' 
      } */
      this.update(req, res)
    );

    this.router.delete('/cars/:id', (req, res) =>
      // #swagger.tags = ['Car']
      // #swagger.summary = 'Deletar Car'
      // #swagger.description = 'Endpoint para deletar Car.'

      /* #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Car ID.'
      } */

      /* #swagger.responses[204] = { 
        description: 'Car deletado!.' 
      } */

      /* #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/IdNotFoundError" },
        description: 'Car não encontrado!.' 
      } */

      /* #swagger.responses[422] = { 
        schema: { $ref: "#/definitions/IdInvalidError" },
        description: 'Id mal formatado!.' 
      } */
      this.delete(req, res)
    );
    return this.router;
  }
}

export default CarController;