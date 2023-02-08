import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../app/api/domains/Motorcycle';
import MotorcycleService from '../../app/api/services/MotorcycleService';

describe('Testes de serviço: Delete Moto', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve deletar Moto caso Id for valido e bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';
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
    let result: boolean = false;
    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves(outputMock);
      Sinon.stub(Model, 'findByIdAndRemove').resolves();
      const service = new MotorcycleService();
      await service.delete(idMock)
      result = true;
    } catch (error) {
      result = false;
    }
    // THEN
    expect(result).to.be.true;
  });

  it('Caso 2: Deve ler "Motorcycle not found" quando Id não existir e for bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';

    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves();
      Sinon.stub(Model, 'findByIdAndRemove').resolves();
      const service = new MotorcycleService();
      const result = await service.delete(idMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Caso 3: Deve ler "Invalid mongo id" quando Id for mal formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2fXXX';

    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves();
      Sinon.stub(Model, 'findByIdAndRemove').resolves();
      const service = new MotorcycleService();
      const result = await service.delete(idMock);
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