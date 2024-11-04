import { CollectionGroupData, ContainerData } from '@src/types';

export type KeyValueObject = {
  [key: string]: string;
};

export type CtxData = {
  keyBindings?: any;
  loader: any;
};

export type StandardCollectionData = {
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
  background: any;
  hero_tile: any;
};
