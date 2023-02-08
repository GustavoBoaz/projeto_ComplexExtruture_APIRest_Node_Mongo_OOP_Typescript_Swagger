import { expect } from 'chai';
import Connection from '../../app/api/models/Connection';

describe('Testes de model: Mongo', function() {
  it('Caso 1: Deve aver uma conexão', async function () {
    let result = false;
    try {
      // WHEN
      await Connection();
      result = true;
    } catch (error) {
      result = false;
    }
    // THEN
    expect(result).to.be.equal(true);
  });
});