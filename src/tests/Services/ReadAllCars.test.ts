import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../app/api/domains/Car';
import CarService from '../../app/api/services/CarService';

describe('Testes de serviço: Read all Cars', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve ler uma lista com 1 Car', async function () {
    // GIVEN
    const outputMock: Car[] = [new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'Black',
      status: true,
      buyValue: 10.990,
      doorsQty: 2,
      seatsQty: 5
    })];

    // WHEN
    Sinon.stub(Model, 'find').resolves(outputMock);
    const service = new CarService();
    const result = await service.readAll();

    // THEN
    expect(result).to.be.deep.equal(outputMock);
    expect(result.length).to.be.equal(1);
  });
});

// describe('', function() {
//   it('', async function () {

//   });
// });