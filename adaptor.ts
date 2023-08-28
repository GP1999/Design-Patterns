/**
 * Adaptor pattern is used to adapt an interface to another interface.
 * It is often used to make existing classes work with others without modifying their source code.
 * Like Transforming One type of Data to another type of Data.
 * Creating a adaptor of different database class  to work with our application.
 */


interface IClientExposedInterface {
    methodWithDifferentSchema(param1: Number): void;
  }
  
  /**
   * Adoptee class is the class which we want to adapt to our application.
   */
  class Adoptee {
    constructor(name: string) {
      console.log(`Adoptee ${name} is created`);
    }
    public exposedMethod(param1: string): void {
      console.log(`Adoptee's exposed method is invoked with param ${param1}`);
    }
  }
  
  
  /** 
   * Adaptor class is the class which adapts the Adoptee class to our application.
  */
  class Adaptor implements IClientExposedInterface {
    private adoptee: Adoptee;
    constructor(adoptee: Adoptee) {
      this.adoptee = adoptee;
    }
    public methodWithDifferentSchema(param1: Number): void {
      console.log(`Adaptor's method is invoked with param ${param1}`);
      this.adoptee.exposedMethod(param1.toString());
    }
  }
  
  /**
   * Client code is the code which uses the Adaptor class to use the Adoptee class.
   */
  function clientCode() {
    const adoptee = new Adoptee("Adoptee");
    const adaptor = new Adaptor(adoptee);
    adaptor.methodWithDifferentSchema(1);
  }
  
  clientCode();
  