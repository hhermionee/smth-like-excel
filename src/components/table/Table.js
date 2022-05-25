import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(100);
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="1:0"]');

    this.selectCell($cell);

    this.$on('Formula:Input', (text) => {
      this.selection.current.text = text;
    });
    this.$on('Formula:Done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$dispatch('Table:Select', $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target)
            .map((id) => this.$root.find(`[data-id="${id}"`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowDown',
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
    ];

    const {key} = event;
    const id = this.selection.current.id(true);

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const $nextCell = this.$root.find(nextSelector(key, id));
      this.selectCell($nextCell);
    }
  }

  onInput(event) {
    this.$dispatch('Table:Input', $(event.target));
  }
}