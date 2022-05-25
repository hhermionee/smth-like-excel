import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `<div class="formula__info">fx</div>
    <div class="formula__input" id="formula" contenteditable></div>`;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('Table:Select', ($cell) => {
      this.$formula.text = $cell.text;
    });
    this.$on('Table:Input', ($cell) => {
      this.$formula.text = $cell.text;
    });
  }

  onInput(event) {
    this.$dispatch('Formula:Input', $(event.target).text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$dispatch('Formula:Done');
    }
  }
}
