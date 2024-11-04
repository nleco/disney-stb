import { create, getMediaThumbnail } from '@src/libs';
import { MediaData } from '@src/types';

export class Media {
  media: MediaData;

  constructor(media: MediaData) {
    this.media = media;
  }

  public render() {
    const m = create('div');
    m.tabIndex = 0;
    m.classList.add('media');

    const img = create('img') as HTMLImageElement;
    img.classList.add('media-image');
    img.onerror = () => {
      img.remove();
      const d = create('div');
      d.classList.add('mod-no-image', 'media-image');

      const p = create('p');
      p.classList.add('media-image-no-text');
      p.innerText = 'No Image';

      d.append(p);
      m.append(d);
    };
    img.src = getMediaThumbnail(this.media);
    m.append(img);

    return m;
  }
}
