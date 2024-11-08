import { Loader, Modal, ShelfContainer } from '@src/components';
import {
  EVENT_KEY_DOWN,
  KEY_DOWN,
  KEY_ENTER,
  KEY_ESCAPE,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP,
  SHELF_CONTAINER,
} from '@src/constants';
import { LazyLoader, create, getApp } from '@src/libs';
import { getHomeData } from '@src/services';
import { ContainerData, CtxData } from '@src/types';

export class HomePage {
  ctx: CtxData;
  containers: ShelfContainer[] = [];
  selectedContainerIndex: number = 0;
  elCollections: HTMLElement;

  constructor() {
    this.ctx = {
      loader: new Loader(),
      modal: new Modal(),
      lazyLoader: new LazyLoader(),
    };
    this._initNavigation();

    this.elCollections = create('div');
    this.elCollections.classList.add('collections');
    this.elCollections.style.top = '0px';
  }

  private _loadContainer(container: ContainerData) {
    if (!container) {
      return;
    }

    switch (container.type) {
      case SHELF_CONTAINER:
        const c = new ShelfContainer(this.ctx, container);
        this.containers.push(c);
        this.elCollections.append(c.render());
        getApp().append(this.elCollections);
        break;

      default:
        return;
    }
  }

  public async load() {
    this.ctx.loader.show();

    try {
      const standardCollection = await getHomeData();
      standardCollection.containers.forEach((container) => {
        this._loadContainer(container);
      });

      this.ctx.loader.hide();
      this.containers[0].navHighlight();
      this.ctx.lazyLoader.setImages();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public unload() {
    document.body.removeEventListener(EVENT_KEY_DOWN, this._navListener);
  }

  private _setTopOffset() {
    const offset = this.containers[this.selectedContainerIndex].getTopOffset();
    getApp().scroll({ top: offset, behavior: 'smooth' });
  }

  private _initNavigation() {
    document.body.addEventListener(EVENT_KEY_DOWN, this._navListener);
  }

  private _navListener = (event: Event) => {
    const e = event as KeyboardEvent;

    e.preventDefault();
    e.stopPropagation();

    switch (e.key) {
      case KEY_UP:
        if (this.ctx.modal.isShown()) {
          return;
        }
        if (0 < this.selectedContainerIndex) {
          this.containers[this.selectedContainerIndex].navUnhighlight();
          this.selectedContainerIndex--;
          this.containers[this.selectedContainerIndex].navHighlight();

          this._setTopOffset();
        }
        break;

      case KEY_DOWN:
        if (this.ctx.modal.isShown()) {
          return;
        }

        if (this.selectedContainerIndex < this.containers.length - 1) {
          this.containers[this.selectedContainerIndex].navUnhighlight();
          this.selectedContainerIndex++;
          this.containers[this.selectedContainerIndex].navHighlight();

          this._setTopOffset();
        }

        break;

      case KEY_LEFT:
        if (this.ctx.modal.isShown()) {
          return;
        }

        this.containers[this.selectedContainerIndex].navPrev();
        break;

      case KEY_RIGHT:
        if (this.ctx.modal.isShown()) {
          return;
        }

        this.containers[this.selectedContainerIndex].navNext();
        break;

      case KEY_ENTER:
        this.containers[this.selectedContainerIndex].onEnter();
        break;

      case KEY_ESCAPE:
        this.containers[this.selectedContainerIndex].onEscape();
        break;

      default:
    }
  };
}
