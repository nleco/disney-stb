import { Loader, Modal } from '@src/components';
import { LazyLoader } from '@src/libs';
import { CollectionGroupData, ContainerData } from '@src/types';

export type KeyValueObject = {
  [key: string]: string;
};

export type CtxData = {
  loader: Loader;
  modal: Modal;
  lazyLoader: LazyLoader;
};

export type CollectionData = {
  callToAction?: string;
  collectionGroup: CollectionGroupData;
  collectionId: string;
  containers: ContainerData[];
  image: any;
  text: TextData;
  type: string;
  videoArt: any;
};

export type TextData = {
  title: {
    full: {
      collection?: TextDefaultData;
      set?: TextDefaultData;
      series?: TextDefaultData;
      program?: TextDefaultData;
      default?: TextDefaultData;
    };
  };
};

export type TextDefaultData = {
  default: {
    content: string;
    language: string;
    sourceEntity: string;
  };
};

export type SlugData = {
  language: string;
  value: string;
};

export type ImageData = {
  tile: any;
  background_details: any;
  background: any;
  hero_tile: any;
  hero_collection: any;
};
