import { create } from '@src/libs';
import { v4 as uuidv4 } from 'uuid';

export class ShelfContainerTile {
  el: HTMLElement;
  id: string;
  content: HTMLElement;

  constructor(el: HTMLElement) {
    this.id = uuidv4();

    this.el = create('li');
    this.el.id = this.id;
    this.content = el;
  }

  render() {
    this.el.classList.add('container-list-tile');
    this.el.append(this.content);

    return this.el;
  }
}
