import {
  DMC_SERIES,
  DMC_SERIES_KEY,
  DMC_VIDEO,
  DMC_VIDEO_KEY,
  STANDARD_COLLECTION,
  STANDARD_COLLECTION_KEY,
  TILE_RATIO,
} from '@src/constants';

import { MediaData, MediaKey } from '@src/types';
import { firstValue } from '@src/libs';

const _getKey = (type: string) => {
  let key: MediaKey = STANDARD_COLLECTION_KEY;

  switch (type) {
    case DMC_VIDEO:
      key = DMC_VIDEO_KEY;
      break;

    case DMC_SERIES:
      key = DMC_SERIES_KEY;
      break;

    case STANDARD_COLLECTION:
      key = STANDARD_COLLECTION_KEY;
      break;
  }

  return key;
};

export const getMediaThumbnail = (media: MediaData, ratio = TILE_RATIO) => {
  const url = firstValue(media.image.tile[ratio])?.default.url || '';
  return url;
};

export const getMediaTitle = (media: MediaData) => {
  const t = firstValue(media.text.title.full);
  let title = t?.default.content || '';
  return title;
};

export const getMediaBackgroundImage = (media: MediaData, ratio = TILE_RATIO) => {
  const url = firstValue(media.image.hero_collection[ratio])?.default.url;
  return url || '';
};
