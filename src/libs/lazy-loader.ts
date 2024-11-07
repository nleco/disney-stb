import { JS_LAZY_LOAD_CLASS } from '@src/constants';

type LazyLoaderCallback = (
  observer: IntersectionObserver,
  entity: IntersectionObserverEntry
) => void;

type CallbackFunction = (el: Element) => void;

export class LazyLoader {
  constructor() {}

  private _imageObserverCallback(el: Element): void {
    const image = el as HTMLImageElement;
    if (image.hasAttribute('src')) {
      return;
    }

    const sourceUrl = image.getAttribute('data-src');
    if (sourceUrl) {
      image.setAttribute('src', sourceUrl);
      image.onload = () => {};
    }
  }

  setLazyLoader(el: Element, callback: CallbackFunction) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0 || entry.isIntersecting) {
          observer.unobserve(entry.target);

          callback(entry.target);

          entry.target.classList.remove(JS_LAZY_LOAD_CLASS);
        }
      });
    });

    observer.observe(el);
  }

  setImages() {
    document.querySelectorAll(`img[data-src]`).forEach((el) => {
      this.setLazyLoader(el as Element, this._imageObserverCallback);
    });
  }
}
