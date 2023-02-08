import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../app/api/domains/Motorcycle';
import IMotorcycle from '../../app/api/interfaces/IMotorcycle';
import MotorcycleService from '../../app/api/services/MotorcycleService';

describe('Testes de serviço: Update Moto', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve atualizar Moto caso Id for valido e bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';
    const inputMock: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Green',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600
    }
    const outputMock: Motorcycle = new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Grenn',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600
    });

    // WHEN
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMock);
    const service = new MotorcycleService();
    const result = await service.update(idMock, inputMock);

    // THEN
    expect(result).to.be.deep.equal(outputMock);
  });

  it('Caso 2: Deve ler "Motorcycle not found" quando Id não existir e for bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';
    const inputMock: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Green',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600
    }

    try {
      // WHEN
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      const service = new MotorcycleService();
      const result = await service.update(idMock, inputMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Caso 3: Deve ler "Invalid mongo id" quando Id for mal formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2fXXX';
    const inputMock: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Green',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600
    }

    try {
      // WHEN
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      const service = new MotorcycleService();
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