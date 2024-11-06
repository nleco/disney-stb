export const create = (tagName: string) => {
  return document.createElement(tagName);
};

export const text = (text: string) => {
  var t = document.createTextNode(text);
  var p = create('p');
  p.appendChild(t);
  return p.innerHTML;
};

export const firstValue = (obj: Object) => {
  if (!obj) {
    return null;
  }

  const vals = Object.values(obj);
  return vals[0];
};
