import { URLParameters } from '@src/types';

export function populateURL(url: string, parameters: URLParameters) {
  if (
    !parameters ||
    typeof parameters === 'boolean' ||
    typeof parameters === 'string' ||
    parameters === null ||
    parameters === undefined ||
    Array.isArray(parameters)
  ) {
    return url;
  }

  let pUrl = url;
  Object.keys(parameters).forEach((key) => {
    pUrl = pUrl.replace(`[:${key}]`, parameters[key]);
  });

  return pUrl;
}
