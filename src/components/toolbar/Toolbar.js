import {ExcelComponent} from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root) {
    super($root, {
      name: 'Toolbar',
    });
  }

  toHTML() {
    return `
    <div class="excel__buttons">
    <button class="excel__button">
      <span class="material-icons">format_align_left</span>
    </button>
    <button class="excel__button">
      <span class="material-icons">format_align_center</span>
    </button>
    <button class="excel__button">
      <span class="material-icons">format_align_right</span>
    </button>
    <button class="excel__button">
      <span class="material-icons">format_bold</span>
    </button>
    <button class="excel__button">
      <span class="material-icons">format_italic</span>
    </button>
    <button class="excel__button">
      <span class="material-icons">format_strikethrough</span>
    </button>
  </div>
    `;
  }
}
