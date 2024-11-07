import { MODAL_SHOW_CLASS } from '@src/constants';
import { create } from '@src/libs';

const MODAL_ID: string = 'page-modal';

export class Modal {
  el: HTMLElement;
  modalWindow: HTMLElement;

  constructor() {
    let modal = document.getElementById(MODAL_ID);

    if (modal) {
      throw new Error('Cannot create another instance of Modal');
    }

    this.el = create('div');
    this.el.classList.add('modal');
    this.el.id = MODAL_ID;

    this.modalWindow = create('div');
    this.modalWindow.classList.add('modal-window');

    this.el.append(this.modalWindow);

    document.body.append(this.el);
  }

  isShown() {
    const modal = document.getElementById(MODAL_ID);
    return modal && modal.classList.contains(MODAL_SHOW_CLASS);
  }

  show(el: HTMLElement) {
    if (this.isShown()) {
      return;
    }

    this.modalWindow.innerHTML = '';
    this.modalWindow.append(el);

    this.el.classList.add(MODAL_SHOW_CLASS);
  }

  hide() {
    const modal = document.getElementById(MODAL_ID);
    modal?.classList.remove(MODAL_SHOW_CLASS);

    this.modalWindow.innerHTML = '';
  }
}
