import {ExcelComponent} from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  toHTML() {
    return `<input type="text" class="excel__name" value="Новая таблица"/>
    <div class="excel__buttons">
      <button class="excel__button">
        <span class="material-icons">delete_outline</span>
      </button>
      <button class="excel__button">
        <span class="material-icons">close</span>
      </button>
    </div>`;
  }
}
