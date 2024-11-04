import { Media } from '@src/components';
import { create } from '@src/libs';
import {
  ContainerData,
  ContainerSetData,
  CtxData,
  KeyValueObject,
  TypeCuratedSet,
  TypeSetRef,
} from '@src/types';

export class ShelfContainer {
  container: ContainerData;
  ctx: CtxData;

  constructor(ctx: CtxData, container: ContainerData) {
    this.container = container;
    this.ctx = ctx;
  }

  private _renderCuratedSet(set: ContainerSetData) {
    const el: HTMLElement[] = [];

    set.items.forEach((media) => {
      const m = new Media(media);
      const mr = m.render();
      mr.classList.add('container-list-item');
      el.push(mr);
    });

    return el;
  }

  private _renderSetRef(set: ContainerSetData) {
    const el = create('p');
    el.innerText = 'Set Ref';

    return [el];
  }

  public render() {
    const el = create('div');
    el.classList.add('nav-root', 'container', this.container.style);

    // Title
    const title = create('h2');
    title.classList.add('container-title');
    title.innerText = this.container.set.text.title.full.set!.default.content;
    el.append(title);

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
        r = this._renderSetRef(this.container.set);
        container_list.append(...r);
        break;

      default:
    }

    container_window.append(container_list);
    el.append(container_window);

    return el;
  }
}
