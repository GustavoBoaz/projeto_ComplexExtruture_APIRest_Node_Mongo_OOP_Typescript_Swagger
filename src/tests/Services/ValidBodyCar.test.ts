import { expect } from 'chai';
import { Request, Response } from 'express';
import { describe, it } from 'mocha';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../app/api/services/CarService';

describe('Testes de serviço: IsValidBody Car', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve passar com body valido', async function () {
    // GIVEN
    const resMock = { } as Response;
    const reqMock = {
      body: {
        model: 'Marea',
        year: 1992,
        color: 'Black',
        status: true,
        buyValue: 10.990,
        doorsQty: 2,
        seatsQty: 5
      }
    } as Request;

    let result: boolean = false;
    try {
      // WHEN
      const service = new CarService();
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
        doorsQty: 2,
        seatsQty: 5
      }
    } as Request;

    let result: boolean = true;
    try {
      // WHEN
      const service = new CarService();
      service.isValidBody(reqMock, resMock, () => {});
      result = true;
    } catch (error) {
      result = false
    }
    // THEN
    expect(result).to.be.false;
  });

  it('Caso 3: Deve falhar sem informações de Car', async function () {
    // GIVEN
    const resMock = { } as Response;
    const reqMock = {
      body: {
        model: 'Marea',
        year: 1992,
        color: 'Black',
        status: true,
        buyValue: 10.990
      }
    } as Request;

    let result: boolean = true;
    try {
      // WHEN
      const service = new CarService();
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