/**
 * Command Pattern:
 * The command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time.
 * 
 * 
 */

// All the New Command Has to implement this interface
interface Command {
    execute(): void;
  }
  
  //Core operation class
  class NetflixUser {
    private userContext: any;
    constructor() {}
    login(): void {
      console.log("Logging in");
      this.userContext = { authToken: "1234567890" };
    }
    logout(): void {
      console.log("Logging out");
      this.userContext = null;
    }
  }
  
  // Wrapper class for the core operation class
  class OpenNetflixCommand implements Command {
    private netflixUser: NetflixUser;
    constructor(newNetflixUser: NetflixUser) {
      this.netflixUser = newNetflixUser;
    }
    execute(): void {
      console.log("Opening Netflix");
      this.netflixUser.login();
    }
  }
  
  class CloseNetflixCommand implements Command {
    private netflixUser: NetflixUser;
    constructor(newNetflixUser: NetflixUser) {
      this.netflixUser = newNetflixUser;
    }
    execute(): void {
      console.log("Closing Netflix");
      this.netflixUser.logout();
    }
  }
  
  // Invoker class
  class Controller {
    private commands: Command[] = [];
    setCommand(button: number, command: Command): void {
      this.commands.splice(button, 0, command);
    }
    pressButton(button: number): void {
      this.commands[button].execute();
    }
  }
  
  const netflixUser = new NetflixUser();
  const openNetflixCommand = new OpenNetflixCommand(netflixUser);
  const closeNetflixCommand = new CloseNetflixCommand(netflixUser);
  const controller = new Controller();
  controller.setCommand(0, openNetflixCommand);
  controller.setCommand(1, closeNetflixCommand);
  controller.pressButton(0);
  controller.pressButton(1);
  