/**
 * Observer Pattern
 *  The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state,
 *  all of its dependents are notified and updated automatically.
 *
 * This Pattern is easy to understand as it can be relate to real life examples also.
 * like notifying users through mail/WA based on their subscription .
 * Here ,will implement observer patter for above scenario.
 * Here subject is Message content (It can be notification for new marketing campeign or new blog release).
 * Observers whould be medium through  users should be modified.We  have three medium email,WA and SMS.
 */

/**
 *
 * All the Observer should implement This interface
 */
interface Observer {
  handleChange(): void;
}

/**
 * all the publisher should implement this Interface
 */
interface Publisher {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  updateAboutStateChange(): void;
}

/**
 * concret Message Publisher class that will notify all its observer
 */
class MessagePublisher implements Publisher {
  private observers: Observer[];
  private message: string;
  constructor() {
    this.observers = [];
    this.message = "";
  }
  setMessage(message: string) {
    this.message = message;
    this.updateAboutStateChange();
  }
  getMessage() {
    return this.message;
  }
  registerObserver(observer: Observer) {
    this.observers.push(observer);
  }
  removeObserver(observer: Observer) {
    const index = this.observers.findIndex((val: Observer) => observer === val);
    delete this.observers[index];
  }
  updateAboutStateChange(): void {
    this.observers.forEach((observer: Observer) => observer.handleChange());
  }
}

/**
 * Observer class
 */

class EmailObserver implements Observer {
  private userEmailIds: string[];
  private messagePublisher: MessagePublisher;
  constructor(publisher: MessagePublisher) {
    this.userEmailIds = [];
    this.messagePublisher = publisher;
    this.messagePublisher.registerObserver(this);
  }
  addUserInEmailList(email: string) {
    this.userEmailIds.push(email);
  }
  handleChange() {
    const message = this.messagePublisher.getMessage();
    this.sendEmailToUsers(message);
  }
  sendEmailToUsers(message: string) {
    this.userEmailIds.forEach((userEmail: string) => {
      console.log(`Sending Email to ${userEmail}: `, message);
    });
  }
  removeRegistration() {
    this.messagePublisher.removeObserver(this);
  }
}

class SMSObserver implements Observer {
  private usersPhoneNumber: string[];
  private messagePublisher: MessagePublisher;
  constructor(publisher: MessagePublisher) {
    this.usersPhoneNumber = [];
    this.messagePublisher = publisher;
    this.messagePublisher.registerObserver(this);
  }
  addUserInSmsList(phoneNumber: string) {
    // Validate phone Number and add
    this.usersPhoneNumber.push(phoneNumber);
  }
  handleChange() {
    const message = this.messagePublisher.getMessage();
    this.sendSMSToUsers(message);
  }
  sendSMSToUsers(message: string) {
    this.usersPhoneNumber.forEach((phoneNumber: string) => {
      console.log(`Sending SMS to ${phoneNumber}: `, message);
    });
  }
  removeRegistration() {
    this.messagePublisher.removeObserver(this);
  }
}

/**
 * Test Patter
 */
function main() {
  const messagePublisher = new MessagePublisher();
  const smsObserver = new SMSObserver(messagePublisher);
  const emailObserver = new EmailObserver(messagePublisher);
  //Adding users in Observer object
  smsObserver.addUserInSmsList("+919876543210");
  emailObserver.addUserInEmailList("xyz@gmail.com");

  //change state of Publisher object which should trigger notification to all observer
  messagePublisher.setMessage("new Message Text");

  //Remove email observer
  emailObserver.removeRegistration();
  messagePublisher.setMessage("new Message Text after removing email observer");
}
main();

/**
 * We can now create any number of Observers which can keep an eye on publisher state. In Future if developer want to integrate new
 * communication medium than he has to now only create new Observer class and register observer with publisher.
 */
