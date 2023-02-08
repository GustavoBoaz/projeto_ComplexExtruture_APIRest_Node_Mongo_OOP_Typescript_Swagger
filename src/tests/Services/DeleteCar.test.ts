import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../app/api/domains/Car';
import CarService from '../../app/api/services/CarService';

describe('Testes de serviço: Delete Car', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve deletar Car caso Id for valido e bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';
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
    let result: boolean = false;
    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves(outputMock);
      Sinon.stub(Model, 'findByIdAndRemove').resolves();
      const service = new CarService();
      await service.delete(idMock)
      result = true;
    } catch (error) {
      result = false;
    }
    // THEN
    expect(result).to.be.true;
  });

  it('Caso 2: Deve ler "Car not found" quando Id não existir e for bem formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2f';

    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves();
      Sinon.stub(Model, 'findByIdAndRemove').resolves();
      const service = new CarService();
      const result = await service.delete(idMock);
    } catch (error) {
      // THEN
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Caso 3: Deve ler "Invalid mongo id" quando Id for mal formatado', async function () {
    // GIVEN
    const idMock: string = '634852326b35b59438fbea2fXXX';

    try {
      // WHEN
      Sinon.stub(Model, 'findById').resolves();
      Sinon.stub(Model, 'findByIdAndRemove').resolves();
      const service = new CarService();
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