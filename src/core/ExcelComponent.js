import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubsribers = [];

    this.prepare();
  }

  prepare() {

  }

  toHTML() {
    return '';
  }

  $dispatch(event, ...args) {
    this.emitter.dispatch(event, ...args);
  }

  $on(event, fn) {
    this.emitter.subscribe(event, fn);
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubsribers.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubsribers.forEach((unsub) => unsub());
  }
}
