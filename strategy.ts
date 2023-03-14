/**
 * Strategy Pattern
 *
 * Definition:
 * The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 * Strategy lets the algorithm vary independently from clients that use it. -- source (Head first design pattern)
 *
 * When To use:
 * When you have objects which can have same class design but different behavior based on individual characteristics.
 * Suppose you have vehicle design system to design .User will select properties and software has to render that realtime.
 * Here we need to identify which things would be fix and which things would very.
 * here consider three things are changing behavior
 * 1.Speed : Different  bilks will have different speed
 * 2.Wheels : Different vehicles have different number of wheels and their type ,price ,properties etc
 * 3.Design : Each vehicle will have different design like color,structure etc.
 * so above three are our changing behaviors . User can select number of wheels ,speed, design based on that UI will render
 * vehicle.
 * So we will create separate interface for all above three behaviors and will include all things which are required
 * to define that behavior.So It can me implemented by different Class to define their   different strategy.
 * Vehicle class would be our Parent class and all the vehicle will be created by inheriting Vehicle class.
 */

/**
 * This are our strategies that will be varying based on vehicle type
 */
interface SpeedBehaviour {
  getMaxSpeed: () => number;
  getAvargeIncreaseInSpeedPerSecond: () => number;
}

interface Wheels {
  getNumberOfWheels: () => number;
}
interface VehicleDesign {
  display: () => void;
}

/**
 * This Parent  class which is compositing behaviours so that it can modify their behaviour at run time also.
 */

class Vehicle {
  private speed: SpeedBehaviour;
  private wheels: Wheels;
  private design: VehicleDesign;

  constructor(speed: SpeedBehaviour, wheels: Wheels, design: VehicleDesign) {
    this.speed = speed;
    this.wheels = wheels;
    this.design = design;
  }

  setSpeed(speed: SpeedBehaviour) {
    this.speed = speed;
  }
  setWheels(wheels: Wheels) {
    this.wheels = wheels;
  }
  setDesign(design: VehicleDesign) {
    this.design = design;
  }
  showMaxSpeed() {
    console.log("Max Speed:", this.speed.getMaxSpeed());
  }
  displayDesign() {
    this.design.display();
  }
  showNumberOfwheels() {
    console.log("Number of Wheels:", this.wheels.getNumberOfWheels());
  }
}

/**
 * This are different type of Speed vehicle can have .This is just for example we can add different
 * properties in class as per requirements.
 */

class HighSpeedVehicle implements SpeedBehaviour {
  private speed: number;
  constructor(speed: number = 100) {
    this.speed = speed;
  }
  getMaxSpeed() {
    return this.speed;
  }
  getAvargeIncreaseInSpeedPerSecond() {
    return this.speed / 10;
  }
}
class SlowSpeedVehicle implements SpeedBehaviour {
  private speed: number;
  constructor(speed: number = 50) {
    this.speed = speed;
  }
  getMaxSpeed() {
    return this.speed;
  }
  getAvargeIncreaseInSpeedPerSecond() {
    return this.speed / 20;
  }
}

/**
 * This are some of the types of wheels
 */
class TwoWheeler implements Wheels {
  getNumberOfWheels() {
    return 2;
  }
}
class FoureWheeler implements Wheels {
  getNumberOfWheels() {
    return 4;
  }
}

/**
 * THis is design with its corresponding properties.
 */
class BlackColor implements VehicleDesign {
  private colorGradiant: string;
  private opacity: number;
  constructor(colorGradiant: string, opacity: number) {
    this.colorGradiant = colorGradiant;
    this.opacity = opacity;
  }
  display() {
    console.log("Design:", this.colorGradiant, this.opacity);
  }
}

/**
 * child class which is using Vehicle parent class to create new Type of Vehicles.
 */
class Bicycle extends Vehicle {
  constructor(speed: SpeedBehaviour, wheels: Wheels, design: VehicleDesign) {
    super(speed, wheels, design);
  }
  getPrice() {
    return 10000;
  }
}

/**
 * This function will process vehicle Object and it is expecting object of type Vehicle
 * so it can process any sub vehicle types with different properties
 * @param vehicle
 */
function displayVehicleInfo(vehicle: Vehicle) {
  vehicle.showMaxSpeed();
  vehicle.showNumberOfwheels();
  vehicle.displayDesign();
}

/**
 * Testing function
 */
function main() {
  /**
   * This are different Behaviours we have created
   */
  const highSpeed = new HighSpeedVehicle();
  const lowSpeed = new SlowSpeedVehicle();
  const blackColorDesign = new BlackColor(
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,2,23,1) 35%, rgba(0,212,255,1) 100))",
    0.5
  );
  const twoWheeler = new TwoWheeler();
  const foureWheeler = new FoureWheeler();

  const currentSelectedVehicle = new Bicycle(
    lowSpeed,
    twoWheeler,
    blackColorDesign
  );
  console.log("------Initial vehicle properties------");
  displayVehicleInfo(currentSelectedVehicle);

  //changing behaviour at runtime
  console.log("------Vehicle property after changing to four wheeler------");
  currentSelectedVehicle.setWheels(foureWheeler);
  displayVehicleInfo(currentSelectedVehicle);

  console.log("------Vehicle property after changing speed------");
  currentSelectedVehicle.setSpeed(highSpeed);
  displayVehicleInfo(currentSelectedVehicle);
}
main();
