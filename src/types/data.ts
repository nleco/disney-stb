export type ContainerType = 'StandardCollection';

export type StandardCollection = {
  callToAction?: string;
  collectionGroup: CollectionGroup;
  collectionId: string;
  containers: Container[];
  image: any;
  text: DataText;
  type: string;
  videoArt: any;
};

export type DataText = {
  title: {
    full: {
      collection: {
        default: {
          content: string;
          language: string;
          sourceEntity: string;
        };
      };
    };
  };
};

export type CollectionGroup = {
  collectionGroupId: string;
  contentClass: string;
  key: string;
  slugs: Slug[];
};

export type Slug = {
  language: string;
  value: string;
};

export type Container = {
  set: {
    contentClass: string;
    items: Media[];
    meta: {
      hits: number;
      offset: number;
      page_size: number;
    };
    setId: string;
    text: DataText;
    type: 'CuratedSet' | 'SetRef';
  };
  type: 'ShelfContainer';
  style: string;
};

export type Media = {
  contentId: string;
  callToAction: any;
  image: MediaImage;
  type: 'DmcVideo' | 'DmcSeries';
};

export type MediaImage = {
  title: any;
  background: any;
  hero_tile: any;
};
