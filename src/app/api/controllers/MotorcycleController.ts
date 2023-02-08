import express, { Request, Response, Router } from 'express';
import Motorcycle from '../domains/Motorcycle';
import IMotorcycle from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';
import MotorcycleService from '../services/MotorcycleService';
import AbstractController from './AbstractController';

class MotorcycleController extends AbstractController<IService<IMotorcycle, Motorcycle>> {
  constructor() {
    super(new MotorcycleService());
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
    this.router.post('/motorcycles', this.service.isValidBody, (req, res) => 
      // #swagger.tags = ['Motorcycle']
      // #swagger.summary = 'Criar Motorcycle'
      // #swagger.description = 'Endpoint para criar um Motorcycle.'

      /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Motorcycle data.',
        required: true,
        schema: { $ref: "#/definitions/Motorcycle" },
      } */

      /* #swagger.responses[201] = { 
        schema: { $ref: "#/definitions/Motorcycle" },
        description: 'Car criado!.' 
      } */

      /* #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/BodyNotFound" },
        description: 'Erro no corpo da requisição!.' 
      } */      
      this.create(req, res)
    );

    this.router.get('/motorcycles', (req, res) =>
      // #swagger.tags = ['Motorcycle']
      // #swagger.summary = 'Listar Motorcycles'
      // #swagger.description = 'Endpoint para listar Motorcycles.'

      /* #swagger.responses[200] = { 
        description: 'Lista de Motorcycle!.' 
      } */
      this.readAll(req, res)
    );

    this.router.get('/motorcycles/:id', (req, res) =>
      // #swagger.tags = ['Motorcycle']
      // #swagger.summary = 'Listar Motorcycle'
      // #swagger.description = 'Endpoint para listar Motorcycle.'

      /* #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Motorcycle ID.'
      } */

      /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Motorcycle" },
        description: 'Motorcycle encontrado!.' 
      } */

      /* #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/IdNotFoundError" },
        description: 'Motorcycle não encontrado!.' 
      } */

      /* #swagger.responses[422] = { 
        schema: { $ref: "#/definitions/IdInvalidError" },
        description: 'Id mal formatado!.' 
      } */
      this.readById(req, res)
    );

    this.router.put('/motorcycles/:id', this.service.isValidBody, (req, res) =>
      // #swagger.tags = ['Motorcycle']
      // #swagger.summary = 'Atualizar Motorcycle'
      // #swagger.description = 'Endpoint para atualizar um Motorcycle.'

      /* #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Motorcycle ID.'
      } */

      /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Motorcycle data.',
        required: true,
        schema: { $ref: "#/definitions/Motorcycle" },
      } */

      /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Motorcycle" },
        description: 'Motorcycle Alterado!.' 
      } */

      /* #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/IdNotFoundError" },
        description: 'Motorcycle não encontrado!.' 
      } */

      /* #swagger.responses[422] = { 
        schema: { $ref: "#/definitions/IdInvalidError" },
        description: 'Id mal formatado!.' 
      } */    
      this.update(req, res)
    );

    this.router.delete('/motorcycles/:id', (req, res) =>
      // #swagger.tags = ['Motorcycle']
      // #swagger.summary = 'Deletar Motorcycle'
      // #swagger.description = 'Endpoint para deletar Motorcycle.'

      /* #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Motorcycle ID.'
      } */

      /* #swagger.responses[204] = { 
        description: 'Motorcycle deletado!.' 
      } */

      /* #swagger.responses[401] = { 
        schema: { $ref: "#/definitions/IdNotFoundError" },
        description: 'Motorcycle não encontrado!.' 
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

export default MotorcycleController;