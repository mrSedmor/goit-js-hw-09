// Deliberated limitations: doesn't allow duplicate handlers.
// If it has to, Set should be replaced with Map, which value is a counter, or Array.

const eventMixin = {
  _eventHandlers: new Map(),
  on(eventName, handler) {
    if (!(handler instanceof Function)) {
      return;
    }

    if (!this._eventHandlers.has(eventName)) {
      this._eventHandlers.set(eventName, new Set());
    }

    this._eventHandlers.get(eventName).add(handler);
  },

  off(eventName, handler) {
    if (!(this._eventHandlers.has(eventName) && handler instanceof Function)) {
      return;
    }
    this._eventHandlers.get(eventName).delete(handler);
  },

  trigger(eventName, ...args) {
    if (!this._eventHandlers.has(eventName)) {
      return;
    }

    this._eventHandlers
      .get(eventName)
      .forEach(handler => handler.apply(this, args));
  },
};

export default eventMixin;
