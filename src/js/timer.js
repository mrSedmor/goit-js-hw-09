import eventMixin from './event-mixin';

class Timer {
  constructor() {
    this._expireTime = null;
    this._intervalId = null;
    this._isActive = false;
    this._updateInterval = 1000;
  }

  start(expireTime) {
    if (!Number.isFinite(expireTime)) {
      return;
    }

    this._expireTime = expireTime;

    if (this._isActive) {
      clearInterval(this._intervalId);
      this._isActive = false;
    }

    this.update();

    if (this._expireTime <= Date.now()) {
      return;
    }

    this._intervalId = setInterval(
      this.update.bind(this),
      this._updateInterval
    );
    this._isActive = true;

    this.trigger('start');
  }

  stop() {
    if (this._isActive) {
      clearInterval(this._intervalId);
      this._isActive = false;
      this.trigger('stop');
    }
  }

  update() {
    const timeLeft = this._expireTime - Date.now();

    if (timeLeft <= 0) {
      this.trigger('update', 0);
      this.trigger('expire');
      this.stop();
      return;
    }

    this.trigger('update', timeLeft);
  }
  isActive() {
    return this._isActive;
  }
}

Object.assign(Timer.prototype, eventMixin);

export default Timer;
