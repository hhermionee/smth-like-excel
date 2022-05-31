import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';
import {defaultStyles} from '../../constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const styleChanges = JSON.parse($target.data.value);
      this.$emit('Toolbar:ApplyStyle', styleChanges);
    }
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }
}
