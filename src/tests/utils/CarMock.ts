import Car from "../../app/api/domains/Car";
import ICar from "../../app/api/interfaces/ICar";


export const validIdInputCar: string = '634852326b35b59438fbea2f';

export const validInputCar: ICar = {
  model: 'Marea',
  year: 1992,
  color: 'Black',
  status: true,
  buyValue: 10.990,
  doorsQty: 2,
  seatsQty: 5
};

export const validOutputCar: Car = new Car({
  id: '634852326b35b59438fbea2f',
  model: 'Marea',
  year: 1992,
  color: 'Black',
  status: true,
  buyValue: 10.990,
  doorsQty: 2,
  seatsQty: 5
});

export const updateInputCar: ICar = {
  id: '634852326b35b59438fbea2f',
  model: 'Marea',
  year: 1992,
  color: 'Orange',
  status: true,
  buyValue: 10.990,
  doorsQty: 2,
  seatsQty: 5
};

export const updateOutputCar: Car = new Car({
  id: '634852326b35b59438fbea2f',
  model: 'Marea',
  year: 1992,
  color: 'Orange',
  status: true,
  buyValue: 10.990,
  doorsQty: 2,
  seatsQty: 5
});

export const carsOutputArray = [
  new Car({
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 1992,
    color: 'Black',
    status: true,
    buyValue: 10.990,
    doorsQty: 2,
    seatsQty: 5
  }),
  new Car({
    id: '634852326b35b59438fbec3e',
    model: 'Golf',
    year: 2000,
    color: 'Green',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5
  }),
];