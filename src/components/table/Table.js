import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';
import {isCell, shouldResize, matrix, nextSelector} from './table.functions';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';
import * as actions from '@/redux/actions';

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
    return createTable(100, this.store.getState());
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="1:0"]');

    this.selectCell($cell);

    this.$on('Formula:Input', (value) => {
      this.selection.current.attribute('data-value', value).text = parse(value);
      this.updateTextInStore(value);
    });
    this.$on('Formula:Done', () => {
      this.selection.current.focus();
    });
    this.$on('Toolbar:ApplyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table:Select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target)
            .map((id) => this.$root.find(`[data-id="${id}"`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text);
  }
}
