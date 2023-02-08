import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../app/api/domains/Motorcycle';
import IMotorcycle from '../../app/api/interfaces/IMotorcycle';
import MotorcycleService from '../../app/api/services/MotorcycleService';


describe('Testes de serviço: Create Moto', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve criar uma Moto', async function () {
    // GIVEN
    const inputMock: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600
    }
    const outputMock: Motorcycle = new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600
    });

    // WHEN
    Sinon.stub(Model, 'create').resolves(outputMock);
    const service = new MotorcycleService();
    const result = await service.create(inputMock);

    // THEN
    expect(result).to.be.deep.equal(outputMock);
  });
});

// describe('', function() {
//   it('', async function () {

//   });
// });