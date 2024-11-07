import { Media, MediaModalContent, MediaViewAll, ShelfContainerTile } from '@src/components';
import { create } from '@src/libs';
import { getRefData } from '@src/services';
import {
  ContainerData,
  ContainerSetData,
  CtxData,
  MediaData,
  TypeCuratedSet,
  TypeSetRef,
} from '@src/types';

import { v4 as uuidv4 } from 'uuid';

export class ShelfContainer {
  container: ContainerData;
  ctx: CtxData;
  selectedTileId: number = 0;
  tileIds: ShelfContainerTile[] = [];
  mediaList: (Media | MediaViewAll)[] = [];
  el: HTMLElement;

  constructor(ctx: CtxData, container: ContainerData) {
    this.container = container;
    this.ctx = ctx;

    this.el = create('div');
    this.el.id = uuidv4();
  }

  private _getSelectedTileContent() {
    return this.mediaList[this.selectedTileId];
  }

  private _getSelectedTile() {
    return this.tileIds[this.selectedTileId];
  }

  private _renderCuratedSet(set: ContainerSetData, key?: string) {
    const el: HTMLElement[] = [];

    set.items.forEach((media) => {
      const m = new Media(media);
      this.mediaList.push(m);
      const mr = m.render();

      const tile = new ShelfContainerTile(mr);
      this.tileIds.push(tile);

      el.push(tile.render());
    });

    if (set.meta.page_size < set.meta.hits) {
      const seeAllText = new MediaViewAll(set);
      this.mediaList.push(seeAllText);

      const tile = new ShelfContainerTile(seeAllText.render());
      this.tileIds.push(tile);

      el.push(tile.render());
    }

    return el;
  }

  private _renderSetRef(set: ContainerSetData) {
    return new Promise((resolve, reject) => {
      getRefData(set)
        .then((set2) => {
          const el = this._renderCuratedSet(set2 as ContainerSetData);
          resolve(el);
        })
        .catch((err) => reject(err));
    });
  }

  public render() {
    this.el.classList.add('nav-root', 'container', this.container.style);

    // Title
    const title = create('h2');
    title.classList.add('container-title');
    title.innerText = this.container.set.text.title.full.set!.default.content;
    this.el.append(title);

    // Window
    const containerWindow = create('div');
    containerWindow.classList.add('container-window');

    // Container List
    const containerList = create('ul');
    containerList.classList.add('container-list');

    let r: HTMLElement[] = [];

    switch (this.container.set.type) {
      case TypeCuratedSet:
        r = this._renderCuratedSet(this.container.set);
        containerList.append(...r);
        break;

      case TypeSetRef:
        containerList.innerHTML = '<p>Loading...</p>';
        this.ctx.lazyLoader.setLazyLoader(containerList, (el) => {
          // added small delay to notice the loading
          setTimeout(() => {
            this._renderSetRef(this.container.set).then((results) => {
              el.innerHTML = '';
              el.append(...(results as HTMLElement[]));
              this.ctx.lazyLoader.setImages();
            });
          }, 200);
        });

        break;

      default:
    }

    containerWindow.append(containerList);
    this.el.append(containerWindow);

    return this.el;
  }

  public navNext() {
    if (this.selectedTileId < this.tileIds.length - 1) {
      this.navUnhighlight();
      this.selectedTileId++;
      this.navHighlight();
    }
  }

  public navPrev() {
    if (0 < this.selectedTileId) {
      this.navUnhighlight();
      this.selectedTileId--;
      this.navHighlight();
    }
  }

  public navHighlight() {
    if (this.tileIds.length) {
      const tile = this._getSelectedTile().el;
      const offset = tile.offsetLeft;

      if (tile.parentElement) {
        tile.parentElement.style.left = offset * -1 + 'px';
        tile.classList.add('mod-selected');
        tile.focus();
      }
    }
  }

  public navUnhighlight() {
    if (this.tileIds.length) {
      const id = this._getSelectedTile().id;
      const tile = document.getElementById(id);
      tile && tile.classList.remove('mod-selected');
    }
  }

  public getTopOffset() {
    return this.el.offsetTop;
  }

  public onEnter() {
    const content = this._getSelectedTileContent();

    if (content instanceof Media) {
      this._showMediaModalContent(content.media);
    } else if (content instanceof MediaViewAll) {
      this._showMediaViewAll(content.set);
    }
  }

  private _showMediaModalContent(media: MediaData) {
    const mediaModal = new MediaModalContent(media);
    this.ctx.modal.show(mediaModal.render());
  }

  private _showMediaViewAll(set: ContainerSetData) {
    // NOTE: This is where we can load a multiple video page
    const el = create('div');
    el.classList.add('view-all-temp');
    el.innerText = 'Loads new page with all videos.';
    this.ctx.modal.show(el);
  }

  public onEscape() {
    this.ctx.modal.hide();
  }
}
