import { Loader } from '@src/components';
import { URL_API_HOME } from '@src/constants';

export class HomePage {
  public async load() {
    const loader = new Loader();
    loader.show();

    try {
      const response = await fetch(URL_API_HOME);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      if (!json.data?.StandardCollection?.containers) {
        throw new Error('No Data');
      }

      const containers = json.data.StandardCollection.containers as any[];

      containers.forEach((container) => {
        //console.log(container);
      });

      loader.hide();
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
