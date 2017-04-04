'use strict';

class Controller {
  constructor() {
    this.events = {};
  }

  set addEvent(data) {
    if(!this.events[data.name])
      this.events[data.name] = {};

    if(!this.events[data.name][data.id])
      this.events[data.name][data.id] = data.event;
    else
      throw new Error(`"${data.id}" already exists in "${data.name}".`);
  }

  set removeEnvet(data) {
    if(!this.events[data.name])
      this.events[data.name] = {};

    if(this.events[data.name][data.id])
      delete this.events[data.name][data.id];
    else
      throw new Error(`"${data.id}" does not exist in "${data.name}".`);
  }

  get getEvents() {
    return this.events;
  }

  runEvent(callback = () => {}) {
    const events = this.events;
    Object.keys(events)
      .forEach(key => {
        window.removeEventListener(key, callback);
        window.addEventListener(key, () => {
          const event = events[key];

          Object.keys(event).forEach(eventKey => {
            event[eventKey]();
          });
        });
      });
  }
}

export default new Controller();
