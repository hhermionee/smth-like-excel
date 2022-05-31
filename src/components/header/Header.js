import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import * as actions from '../../redux/actions';
import {defaultTitle} from '../../constants';
import {debounce} from '../../core/utils';
import {ActiveRoute} from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
      <button class="excel__button" data-button="delete">
        <span class="material-icons" data-button="delete">delete_outline</span>
      </button>
      <button class="excel__button" data-button="close">
        <span class="material-icons" data-button="close">close</span>
      </button>
    </div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text));
  }

  onClick(event) {
    const $target = $(event.target);
    const button = $target.data.button;

    if (button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить страницу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if (button === 'close') {
      ActiveRoute.navigate('');
    }
  }
}
