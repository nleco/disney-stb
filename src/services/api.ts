import { URL_API_HOME, URL_API_REF_SETS } from '@src/constants';
import { ContainerSetData, CollectionData } from '@src/types';

const _populateUrl = (url: string, data: { [key: string]: string }) => {
  const newUrl = Object.keys(data).reduce((prev, curr) => {
    const id = data[curr];

    return prev.replace(`[:${curr}]`, encodeURI(id));
  }, url);

  return newUrl;
};

const _getRequestOptions = () => {
  // NOTE: Get proper auth/request info from configs.

  const headers = new Headers();

  const requestOptions: RequestInit = {
    headers,
  };

  return requestOptions;
};

export async function getHomeData() {
  const response = await fetch(URL_API_HOME, _getRequestOptions());

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();

  if (!json.data?.StandardCollection?.containers) {
    throw new Error('No Data');
  }

  return json.data.StandardCollection as CollectionData;
}

export function getRefData(set: ContainerSetData) {
  if (!set) {
    throw new Error(`No set`);
  }

  return new Promise((resolve, reject) => {
    const url = _populateUrl(URL_API_REF_SETS, {
      REF_ID: set.refId,
    });

    fetch(url, _getRequestOptions())
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        response
          .json()
          .then((json) => {
            const refSet = Object.values(json.data).pop();

            resolve(refSet as ContainerSetData);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}
