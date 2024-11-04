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
  const key = _getKey(media.type);
  const url = media.image.tile[ratio][key]?.default.url || '';
  return url;
};

export const getMediaTitle = (media: MediaData) => {
  const key = _getKey(media.type);
  const title = media.text.title.full[key];

  return title?.default.content;
};
