import { emit } from "./eventEmitter";

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

function onUpdate(prop, value) {
  emit("menu", prop, value);
}

export const initialSettigns = {
  gridWidth: 200,
  gridHeight: 200,
  pause: true,
  ups: 8,
};

export const gameSettingsState = new Proxy(initialSettigns, handler);
