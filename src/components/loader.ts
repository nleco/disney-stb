import { $t } from '@src/i18n';

const SELECTOR_LOADER = 'id-loader';

export class Loader {
  private _self() {
    return document.getElementById(SELECTOR_LOADER);
  }

  public show() {
    this.hide();
    const loader = document.createElement('div');
    loader.id = SELECTOR_LOADER;
    loader.classList.add('loader');
    loader.innerHTML = `<div class="loader-body"><p class="loader-text">${$t('LOADING')}</p></div>`;

    document.body.appendChild(loader);
  }

  public hide() {
    this._self()?.remove();
  }
}
