import { expect } from 'chai';
import { Request, Response } from 'express';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import MotorcycleService from '../../app/api/services/MotorcycleService';


describe('Testes de serviço: IsValidBody Moto', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve passar com body valido', async function () {
    // GIVEN
    const resMock = { } as Response;
    const reqMock = {
      body: {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600
      }
    } as Request;

    let result: boolean = false;
    try {
      // WHEN
      const service = new MotorcycleService();
      service.isValidBody(reqMock, resMock, () => {});
      result = true;
    } catch (error) {
      result = false
    }
    // THEN
    expect(result).to.be.true;
  });

  it('Caso 2: Deve falhar sem informações de Vehicle', async function () {
    // GIVEN
    const resMock = { } as Response;
    const reqMock = {
      body: {
        category: 'Street',
        engineCapacity: 600
      }
    } as Request;

    let result: boolean = true;
    try {
      // WHEN
      const service = new MotorcycleService();
      service.isValidBody(reqMock, resMock, () => {});
      result = true;
    } catch (error) {
      result = false
    }
    // THEN
    expect(result).to.be.false;
  });

  it('Caso 3: Deve falhar sem informações de Moto', async function () {
    // GIVEN
    const resMock = { } as Response;
    const reqMock = {
      body: {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
      }
    } as Request;

    let result: boolean = true;
    try {
      // WHEN
      const service = new MotorcycleService();
      service.isValidBody(reqMock, resMock, () => {});
      result = true;
    } catch (error) {
      result = false
    }
    // THEN
    expect(result).to.be.false;
  });
});

// describe('', function() {
//   it('', async function () {

//   });
// });