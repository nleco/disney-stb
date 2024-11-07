import { $t } from '@src/i18n';
import { create } from '@src/libs';
import { ContainerSetData } from '@src/types';
import { v4 as uuidv4 } from 'uuid';

export class MediaViewAll {
  id: string;
  el: HTMLElement;
  set: ContainerSetData;

  constructor(set: ContainerSetData) {
    this.id = uuidv4();
    this.set = set;

    this.el = create('div');
    this.el.id = this.id;
  }

  render() {
    this.el.tabIndex = 0;
    this.el.classList.add('media-view-all');

    this.el.innerHTML = `<p class="mva-text">${$t('VIEW_ALL')} &rarr;</p>`;

    return this.el;
  }
}
