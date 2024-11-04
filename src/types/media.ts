import { DMC_SERIES, DMC_VIDEO } from '@src/constants';
import { ImageData, TextData } from '@src/types';

export type MediaType = typeof DMC_SERIES | typeof DMC_VIDEO;

export type MediaData = {
  contentId: string;
  callToAction: any;
  image: ImageData;
  type: MediaType;
  text: TextData;
};
