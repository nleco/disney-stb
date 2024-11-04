import { Loader, ShelfContainer } from '@src/components';
import { URL_API_HOME } from '@src/constants';
import { ContainerData, CtxData, StandardCollectionData } from '@src/types';

export class HomePage {
  ctx: CtxData;
  containers: ShelfContainer[] = [];
  app: HTMLElement;

  constructor() {
    this.ctx = {
      loader: new Loader(),
    };
    this.app = document.getElementById('app')!;
  }

  private async _getData() {
    const response = await fetch(URL_API_HOME);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    if (!json.data?.StandardCollection?.containers) {
      throw new Error('No Data');
    }

    return json.data.StandardCollection as StandardCollectionData;
  }

  private _loadContainer(container: ContainerData) {
    if (!container) {
      return;
    }

    switch (container.type) {
      case 'ShelfContainer':
        const c = new ShelfContainer(this.ctx, container);
        this.containers.push(c);
        this.app.append(c.render());
        break;

      default:
        return;
    }
  }

  public async load() {
    this.ctx.loader.show();

    try {
      const standard_collection = await this._getData();
      standard_collection.containers.forEach((container) => {
        this._loadContainer(container);
      });

      this.ctx.loader.hide();
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
