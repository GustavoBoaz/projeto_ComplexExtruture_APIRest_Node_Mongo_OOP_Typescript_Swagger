import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../app/api/domains/Car';
import CarService from '../../app/api/services/CarService';

describe('Testes de serviço: Read Car by Id', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve ler 1 Car caso Id for valido e bem formatado', async function () {
    // GIVEN
    const inputMock: string = '634852326b35b59438fbea2f';
    const outputMock: Car = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'Black',
      status: true,
      buyValue: 10.990,
      doorsQty: 2,
      seatsQty: 5
    });

    // WHEN
    Sinon.stub(Model, 'findById').resolves(outputMock);
    const service = new CarService();
    const result = await service.readById(inputMock);

    // THEN
    expect(result).to.be.deep.equal(outputMock);
  });

  it('Caso 2: Deve ler "Car not found" quando Id não existir e for bem formatado', async function () {
    // GIVEN
    const inputMock: string = '634852326b35b59438fbea2f';

    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves(null);
      const service = new CarService();
      const result = await service.readById(inputMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Caso 3: Deve ler "Invalid mongo id" quando Id for mal formatado', async function () {
    // GIVEN
    const inputMock: string = '634852326b35b59438fbeaXXXX';

    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves(null);
      const service = new CarService();
      const result = await service.readById(inputMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
});

// describe('', function() {
//   it('', async function () {

//   });
// });