const ee = require('event-emitter');

const events = ee({});

events.get = (event, ...args)=>{
  return new Promise((resolve)=>{
    events.emit(event, ...args, resolve);
  });
}

export default events;