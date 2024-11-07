import { create, getMediaThumbnail, getMediaTitle } from '@src/libs';
import { MediaData } from '@src/types';
import { v4 as uuidv4 } from 'uuid';

export class Media {
  media: MediaData;
  id: string;
  el: HTMLElement;

  constructor(media: MediaData) {
    this.media = media;
    this.id = uuidv4();

    this.el = create('div');
    this.el.id = this.id;
  }

  onEnter() {
    console.log(this.media);
  }

  render() {
    this.el.tabIndex = 0;
    this.el.classList.add('media');

    const img = create('img') as HTMLImageElement;
    img.classList.add('media-image', 'js-lazy-load');
    img.onerror = () => {
      img.remove();
      const d = create('div');
      d.classList.add('media-no-image');

      const p = create('p');
      p.classList.add('media-no-image-text');
      p.innerText = getMediaTitle(this.media) || 'No Image';

      d.append(p);
      this.el.append(d);
    };
    img.setAttribute('data-src', getMediaThumbnail(this.media));
    this.el.append(img);

    return this.el;
  }
}
