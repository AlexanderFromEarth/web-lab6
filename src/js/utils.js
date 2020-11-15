String.prototype.toKebabCase = function () {
  return this.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  )
    .map((x) => x.toLowerCase())
    .join("-");
};

Object.defineProperty(String.prototype, "toKebabCase", { enumerable: false });

Array.prototype.equals = function (array) {
  if (!array) return false;

  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
};
Object.defineProperty(Array.prototype, "equals", { enumerable: false });
