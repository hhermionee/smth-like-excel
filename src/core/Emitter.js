export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // Уведомление слушателей, если они есть
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // Подписка на уведомления
  // formula.subscribe('table:select', () => { })
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);

    return {
      unsubscribe: () => {
        this.listeners[eventName] =
        this.listeners[eventName].filter((listener) => listener != fn);
      },
    };
  }
}
