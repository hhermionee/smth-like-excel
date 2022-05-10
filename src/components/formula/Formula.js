import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `<div class="formula__info">fx</div>
    <input class="formula__input"/>`;
  }

  onInput(event) {
    console.log(event);
    console.log('Formula onInput', event.target.value);
  }

  onClick() {}
}
