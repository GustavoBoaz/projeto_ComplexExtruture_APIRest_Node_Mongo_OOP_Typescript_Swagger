import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../app/api/domains/Motorcycle';
import MotorcycleService from '../../app/api/services/MotorcycleService';

describe('Testes de serviço: Read all Motos', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve ler uma lista com 1 Moto', async function () {
    // GIVEN
    const outputMock: Motorcycle[] = [new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600
    })];

    // WHEN
    Sinon.stub(Model, 'find').resolves(outputMock);
    const service = new MotorcycleService();
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