const subscriptions = {};

export function subscribe(name, callback) {
  if (!subscriptions[name]) {
    subscriptions[name] = [callback];
    return;
  }
  subscriptions[name].push(callback);
}

export function unsubscribe(name, callback) {
  subscriptions[name] = subscriptions[name].filter((c) => c != callback);
}

export function emit(name, ...args) {
  (subscriptions[name] || []).forEach((callback) =>
    callback.call(null, ...args)
  );
}
