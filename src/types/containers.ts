import { SHELF_CONTAINER } from '@src/constants';
import { MediaData, TextData } from '@src/types';

// Sets
export const TypeSetRef = 'SetRef';
export const TypeCuratedSet = 'CuratedSet';
export type SetType = typeof TypeSetRef | typeof TypeCuratedSet;

export type ContainerDataType = typeof SHELF_CONTAINER;

export type ContainerSetData = {
  contentClass: string;
  items: MediaData[];
  meta: {
    hits: number;
    offset: number;
    page_size: number;
  };
  setId: string;
  text: TextData;
  type: SetType;
};

export type ContainerData = {
  set: ContainerSetData;
  type: ContainerDataType;
  style: string;
};
