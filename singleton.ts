/**
 * Singleton Pattern:
 * The singleton pattern is a design pattern that restricts the instantiation of a class to one object.
 * This is useful when exactly one object is needed to coordinate actions across the system.
 * Like creating Database connection, creating a logger, etc. As Javascript is a single-threaded language,
 * no need to worry about multiple threads accessing the singleton class.
 */

class Singleton {
    private static instance: Singleton;
    private constructor() { }
    static getInstance(): Singleton {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
}

const Singleton1 = Singleton.getInstance();
const Singleton2 = Singleton.getInstance();
if (Singleton1 === Singleton2)
    console.log("Singleton works, both variables contain the same instance.");
else console.log("Singleton failed, variables contain different instances.");
