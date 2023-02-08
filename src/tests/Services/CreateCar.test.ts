import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../app/api/domains/Car';
import ICar from '../../app/api/interfaces/ICar';
import CarService from '../../app/api/services/CarService';

describe('Testes de serviço: Create Car', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve criar um Car', async function () {
    // GIVEN
    const inputMock: ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Black',
      status: true,
      buyValue: 10.990,
      doorsQty: 2,
      seatsQty: 5
    }
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
    Sinon.stub(Model, 'create').resolves(outputMock);
    const service = new CarService();
    const result = await service.create(inputMock);

    // THEN
    expect(result).to.be.deep.equal(outputMock);
  });
});

// describe('', function() {
//   it('', async function () {

//   });
// });