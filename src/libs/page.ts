import { APP_ID } from '@src/constants';
import { create } from '@src/libs';

const _createApp = () => {
  const app = create('div');
  app.id = APP_ID;
  app.classList.add('app');

  document.body.append(app);
  return app;
};

export const getApp = () => {
  return document.getElementById(APP_ID) || _createApp();
};
