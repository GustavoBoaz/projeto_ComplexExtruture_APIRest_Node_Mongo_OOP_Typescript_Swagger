import Sinon from 'sinon';
import request from 'supertest';
import CarService from '../../app/api/services/CarService';
import App from '../../app/App';
import { carsOutputArray, updateInputCar, updateOutputCar, validIdInputCar, validInputCar, validOutputCar } from '../utils/CarMock';

describe('Teste de controlador: Car controller', function() {
  beforeEach(async () => {
    // GIVEN
    Sinon.stub(CarService.prototype, 'create').resolves(validOutputCar);
    Sinon.stub(CarService.prototype, 'readAll').resolves(carsOutputArray);
    Sinon.stub(CarService.prototype, 'readById').resolves(validOutputCar);
    Sinon.stub(CarService.prototype, 'update').resolves(updateOutputCar);
    Sinon.stub(CarService.prototype, 'delete').resolves();
  });

  afterEach(async () => {
    Sinon.restore();
  });

  it('Caso 1: Deve retornar status 201', async function () {
    await request(App)
      // WHEN
      .post('/cars')
      .send(validInputCar)
      // THEN
      .expect(201); 
  });

  it('Caso 2: Deve retornar status 200', async function () {
    await request(App)
      // WHEN
      .get('/cars')
      // THEN
      .expect(200);
  });

  it('Caso 3: Deve retornar status 200', async function () {
    await request(App)
      // WHEN
      .get(`/cars/${validIdInputCar}`)
      // THEN
      .expect(200);
  });

  it('Caso 4: Deve retornar status 200', async function () {
    await request(App)
      // WHEN
      .put(`/cars/${validIdInputCar}`)
      .send(updateInputCar)
      // THEN
      .expect(200);
  });

  it('Caso 5: Deve retornar status 204', async function () {
    await request(App)
      // WHEN
      .delete(`/cars/${validIdInputCar}`)
      // THEN
      .expect(204);
  });
});