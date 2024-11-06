import {
  DMC_SERIES,
  DMC_SERIES_KEY,
  DMC_VIDEO,
  DMC_VIDEO_KEY,
  STANDARD_COLLECTION,
  STANDARD_COLLECTION_KEY,
} from '@src/constants';
import { ImageData, TextData } from '@src/types';

export type MediaType = typeof DMC_SERIES | typeof DMC_VIDEO | typeof STANDARD_COLLECTION;
export type MediaKey =
  | typeof DMC_SERIES_KEY
  | typeof DMC_VIDEO_KEY
  | typeof STANDARD_COLLECTION_KEY;

export type MediaData = {
  contentId: string;
  callToAction: any;
  image: ImageData;
  type: MediaType;
  text: TextData;
  ratings: Rating[];
};

export type Rating = {
  advisories: any[];
  description: string;
  sytem: string;
  value: string;
};
