import { Loader, ShelfContainer } from '@src/components';
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
import { create } from '@src/libs';
import { getHomeData } from '@src/services';
import { ContainerData, CtxData } from '@src/types';

export class HomePage {
  ctx: CtxData;
  containers: ShelfContainer[] = [];
  app: HTMLElement;
  selectedContainerIndex: number = 0;
  elCollections: HTMLElement;

  constructor() {
    this.ctx = {
      loader: new Loader(),
    };
    this.app = document.getElementById('app')!;
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
        this.app.append(this.elCollections);
        break;

      default:
        return;
    }
  }

  public async load() {
    this.ctx.loader.show();

    try {
      const standard_collection = await getHomeData();
      standard_collection.containers.forEach((container) => {
        this._loadContainer(container);
      });

      this.ctx.loader.hide();
      this.containers[0].navHighlight();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  private _setTopOffset() {
    this.elCollections.style.top =
      this.containers[this.selectedContainerIndex].getTopOffset() * -1 + 'px';
  }

  private _initNavigation() {
    document.body.addEventListener(EVENT_KEY_DOWN, (e) => {
      e.preventDefault();
      e.stopPropagation();

      switch (e.key) {
        case KEY_UP:
          if (0 < this.selectedContainerIndex) {
            this.containers[this.selectedContainerIndex].navUnhighlight();
            this.selectedContainerIndex--;
            this.containers[this.selectedContainerIndex].navHighlight();

            this._setTopOffset();
          }
          break;

        case KEY_DOWN:
          if (this.selectedContainerIndex < this.containers.length - 1) {
            this.containers[this.selectedContainerIndex].navUnhighlight();
            this.selectedContainerIndex++;
            this.containers[this.selectedContainerIndex].navHighlight();

            this._setTopOffset();
          }

          break;

        case KEY_LEFT:
          this.containers[this.selectedContainerIndex].navPrev();
          break;

        case KEY_RIGHT:
          this.containers[this.selectedContainerIndex].navNext();
          break;

        case KEY_ENTER:
          //todo: show Modal
          console.log('ENTER');
          break;

        case KEY_ESCAPE:
          //todo: hide modal if open
          console.log('ESCAPE');
          break;

        default:
      }
    });
  }
}
