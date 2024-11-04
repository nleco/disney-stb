import { Media } from '@src/components';
import { create } from '@src/libs';
import { getRefData } from '@src/services';
import { ContainerData, ContainerSetData, CtxData, TypeCuratedSet, TypeSetRef } from '@src/types';

import { v4 as uuidv4 } from 'uuid';

export class ShelfContainer {
  container: ContainerData;
  ctx: CtxData;
  selectedMediaIndex: number = 0;
  mediaList: Media[] = [];
  el: HTMLElement;

  constructor(ctx: CtxData, container: ContainerData) {
    this.container = container;
    this.ctx = ctx;

    this.el = create('div');
    this.el.id = uuidv4();
  }

  private _renderCuratedSet(set: ContainerSetData, key?: string) {
    const el: HTMLElement[] = [];

    set.items.forEach((media) => {
      const m = new Media(media);
      this.mediaList.push(m);
      const mr = m.render();
      mr.classList.add('container-list-item');
      el.push(mr);
    });

    return el;
  }

  private _renderSetRef(set: ContainerSetData) {
    return new Promise((resolve, reject) => {
      const el = create('p');

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
    const container_window = create('div');
    container_window.classList.add('container-window');

    // Container List
    const container_list = create('ul');
    container_list.classList.add('container-list');

    let r: HTMLElement[] = [];

    switch (this.container.set.type) {
      case TypeCuratedSet:
        r = this._renderCuratedSet(this.container.set);
        container_list.append(...r);
        break;

      case TypeSetRef:
        this._renderSetRef(this.container.set).then((results) => {
          container_list.append(...(results as HTMLElement[]));
        });

        break;

      default:
    }

    container_window.append(container_list);
    this.el.append(container_window);

    return this.el;
  }

  public navNext() {
    if (this.selectedMediaIndex < this.mediaList.length - 1) {
      this.navUnhighlight();
      this.selectedMediaIndex++;
      this.navHighlight();
    }
  }

  public navPrev() {
    if (0 < this.selectedMediaIndex) {
      this.navUnhighlight();
      this.selectedMediaIndex--;
      this.navHighlight();
    }
  }

  public navHighlight() {
    if (this.mediaList.length) {
      const media = this.mediaList[this.selectedMediaIndex].el;
      const offset = media.offsetLeft;

      if (media.parentElement) {
        media.parentElement.style.left = offset * -1 + 'px';
        media.classList.add('mod-selected');
      }
    }
  }

  public navUnhighlight() {
    if (this.mediaList.length) {
      const id = this.mediaList[this.selectedMediaIndex].id;
      const media = document.getElementById(id);
      media && media.classList.remove('mod-selected');
    }
  }

  public getTopOffset() {
    return this.el.offsetTop;
  }

  public onClick() {}
}
