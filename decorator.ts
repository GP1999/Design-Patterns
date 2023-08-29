/**
 * Decorator Patter: It simply adds a functionality to an existing object/target.
 * It is a structural design pattern.You can find this patter very commonly in NestJS, Angular.
 * It is a very powerful pattern and can be used in many ways.
 */

/**
 * Class decorator: It is used to add functionality to a class.
 */
@ClassRoute("cats")
class ApiController {
  public path: string;

  constructor(path: string) {
    this.path = path;
  }

  /**
   * Decorated method
   * @returns
   */
  @ApiRoute("GET", "/")
  public getData() {
    console.log("get data called");
    console.log(this.path);
    return {
      name: "abc",
    };
  }
}

/**
 * Method decorator: It is used to add functionality to a method.
 * @param httpMethod
 * @param path
 * @returns
 */
function ApiRoute(httpMethod: string, path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    // Assign a new function to the descriptor to maintain the correct this
    descriptor.value = function (...args: any[]) {
      console.log("Here we can register the route with express");
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

/**
 * class decorator to add extra properties during constructor call
 * @param path
 * @returns
 */
function ClassRoute(path: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      path = path;
    };
  };
}

const apiController = new ApiController("/api");

apiController.getData();
