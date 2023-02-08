import IMotorcycle from '../interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcyle: IMotorcycle) {
    super({
      id: motorcyle.id,
      model: motorcyle.model,
      year: motorcyle.year,
      color: motorcyle.color,
      status: motorcyle.status,
      buyValue: motorcyle.buyValue,
    });
    this.category = motorcyle.category;
    this.engineCapacity = motorcyle.engineCapacity;
  }
}

export default Motorcycle;