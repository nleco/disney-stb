import { Media } from '@src/components';
import { MODAL_SHOW_CLASS, STANDARD_COLLECTION } from '@src/constants';
import { $t } from '@src/i18n';
import { create, getMediaBackgroundImage, getMediaTitle } from '@src/libs';

const MODAL_ID: string = 'page-modal';

export class Modal {
  el: HTMLElement;

  constructor() {
    this.el = this._create();
  }

  isShown() {
    const modal = document.getElementById(MODAL_ID);
    return modal && modal.classList.contains(MODAL_SHOW_CLASS);
  }

  private _create() {
    this.el = create('div');
    this.el.classList.add('modal');
    this.el.id = MODAL_ID;

    this.el.innerHTML =
      '<div class="modal-window"><div class="footer"><h2 class="modal-window-title"></h2><ul class="modal-window-tags"></ul></div></div>';

    return this.el;
  }

  private _populate(media: Media) {
    const modal_window = this.el.getElementsByClassName('modal-window').item(0)! as HTMLElement;
    const title = this.el.getElementsByClassName('modal-window-title').item(0)! as HTMLElement;
    const tags = this.el.getElementsByClassName('modal-window-tags').item(0)! as HTMLElement;

    // BG image
    const url = getMediaBackgroundImage(media.media);
    modal_window.style.backgroundImage = `url(${url})`;
    title.innerText = getMediaTitle(media.media) || '';

    // tag pills
    tags.innerHTML = '';
    let tag_list: HTMLElement[] = [];

    if (media.media.type === STANDARD_COLLECTION) {
      const el = create('li');
      el.classList.add('pill', 'mod-alt');
      el.innerText = $t('COLLECTION');
      tag_list.push(el);
    }

    if (media.media.ratings?.length) {
      const rating_pills = media.media.ratings.map((rating) => {
        const el = create('li');
        el.classList.add('pill');
        el.innerText = rating.value;

        return el;
      });

      tag_list = tag_list.concat(rating_pills);
    }
    tags.append(...tag_list);
  }

  private _render(media: Media) {
    let modal = document.getElementById(MODAL_ID);

    if (!modal) {
      modal = this._create();
      document.body.append(modal);
    }

    this._populate(media);

    modal.classList.add(MODAL_SHOW_CLASS);

    return modal;
  }

  show(media: Media) {
    if (this.isShown()) {
      return;
    }

    this._render(media);
  }

  hide() {
    const modal = document.getElementById(MODAL_ID);
    modal?.classList.remove(MODAL_SHOW_CLASS);
  }
}
