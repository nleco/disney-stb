import { DMC_SERIES_IMAGE_KEY, DMC_VIDEO, DMC_VIDEO_IMAGE_KEY, TILE_RATIO } from '@src/constants';
import { MediaData } from '@src/types';

export const getMediaThumbnail = (media: MediaData, ratio = TILE_RATIO) => {
  const tile_key = media.type === DMC_VIDEO ? DMC_VIDEO_IMAGE_KEY : DMC_SERIES_IMAGE_KEY;
  const url = media.image.tile[ratio][tile_key]?.default.url || '';

  return url;
};
