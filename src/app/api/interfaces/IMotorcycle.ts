import IVehicle from './IVehicle';

interface IMotorcycle extends IVehicle {
  category: string;
  engineCapacity: number;
}

export default IMotorcycle;