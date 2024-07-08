const handler = {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    onUpdate(prop, value);
    return true;
  },
};

const subscriptions = new Map();

function onUpdate(prop, value) {
  for (const sub of subscriptions) {
    sub[1](prop, value);
  }
}

export const initialSettigns = {
  gridWidth: 200,
  gridHeight: 200,
  pause: true,
  ups: 60,
};

export function addSubscription(name, callback) {
  subscriptions.set(name, callback);
}

export function removeSubscription(name) {
  subscriptions.delete(name);
}

export const gameSettingsState = new Proxy(initialSettigns, handler);
