import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {shouldResize, resizeHandler} from './table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
