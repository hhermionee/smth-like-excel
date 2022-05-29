import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import * as actions from '../../redux/actions';
import {defaultTitle} from '../../constants';
import {debounce} from '../../core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `<input type="text" class="excel__name" value="${title}"/>
    <div class="excel__buttons">
      <button class="excel__button">
        <span class="material-icons">delete_outline</span>
      </button>
      <button class="excel__button">
        <span class="material-icons">close</span>
      </button>
    </div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text));
  }
}
