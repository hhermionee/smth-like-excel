import {$} from '../core/dom';
import {Page} from '../core/Page';
import {createRecordsTable} from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();

    return $.create('div', 'dashboard')
        .html(`
          <div class="dashboard__header">
            <h1>Таблицы</h1>
          </div>

          <div class="dashboard__new">
            <div class="dashboard__view">
              <a href="#excel/${now}" class="dashboard__create">
                <span class="material-icons">note_add</span>
              </a>
            </div>
          </div>

          <div class="dashboard__history dashboard__view">
            ${createRecordsTable()}
          </div>
      `);
  }
}
