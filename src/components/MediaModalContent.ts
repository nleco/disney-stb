import { STANDARD_COLLECTION } from '@src/constants';
import { $t } from '@src/i18n';
import { create, getMediaBackgroundImage, getMediaTitle } from '@src/libs';
import { MediaData } from '@src/types';

export class MediaModalContent {
  el: HTMLElement;
  media: MediaData;

  constructor(media: MediaData) {
    this.el = create('div');
    this.el.classList.add('media-modal-content');

    this.media = media;
  }

  render() {
    const title = create('h2');
    title.classList.add('mmc-title');

    // BG image
    const url = getMediaBackgroundImage(this.media);
    this.el.style.backgroundImage = `url(${url})`;
    title.innerText = getMediaTitle(this.media) || '';

    // TAGS
    const tags = create('ul');
    tags.classList.add('mmc-tags');

    tags.innerHTML = '';
    let tag_list: HTMLElement[] = [];

    if (this.media.type === STANDARD_COLLECTION) {
      const el = create('li');
      el.classList.add('pill', 'mod-alt');
      el.innerText = $t('COLLECTION');
      tag_list.push(el);
    }

    if (this.media.ratings?.length) {
      const ratingPills = this.media.ratings.map((rating) => {
        const el = create('li');
        el.classList.add('pill');
        el.innerText = rating.value;

        return el;
      });

      tag_list = tag_list.concat(ratingPills);
    }
    tags.append(...tag_list);

    // BUILD
    const footer = create('div');
    footer.classList.add('mmc-footer');
    footer.append(title, tags);

    this.el.append(footer);

    return this.el;
  }
}
