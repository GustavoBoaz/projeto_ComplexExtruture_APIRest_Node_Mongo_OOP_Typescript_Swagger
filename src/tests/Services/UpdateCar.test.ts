import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../app/api/domains/Car';
import ICar from '../../app/api/interfaces/ICar';
import CarService from '../../app/api/services/CarService';

describe('Testes de serviço: Update Car', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve atualizar Car caso Id for valido e bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';
    const inputMock: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'White',
      status: true,
      buyValue: 10.990,
      doorsQty: 2,
      seatsQty: 5
    }
    const outputMock: Car = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'White',
      status: true,
      buyValue: 10.990,
      doorsQty: 2,
      seatsQty: 5
    });

    // WHEN
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMock);
    const service = new CarService();
    const result = await service.update(idMock, inputMock);

    // THEN
    expect(result).to.be.deep.equal(outputMock);
  });

  it('Caso 2: Deve ler "Car not found" quando Id não existir e for bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';
    const inputMock: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'White',
      status: true,
      buyValue: 10.990,
      doorsQty: 2,
      seatsQty: 5
    }

    try {
      // WHEN
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      const service = new CarService();
      const result = await service.update(idMock, inputMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Caso 3: Deve ler "Invalid mongo id" quando Id for mal formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2fXXX';
    const inputMock: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'White',
      status: true,
      buyValue: 10.990,
      doorsQty: 2,
      seatsQty: 5
    }

    try {
      // WHEN
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      const service = new CarService();
      const result = await service.update(idMock, inputMock);
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