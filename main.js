var obsidian_import = require("obsidian");

var obsidian = Object.defineProperty(
  Object.defineProperty(
    Object.create(Object.getPrototypeOf(obsidian_import)),
    "default",
    { get: () => obsidian_import.default, enumerable: true }
  ), "__esModule", { value: true }
);

for (let key of Object.getOwnPropertyNames(obsidian_import)) {
  if (!Object.prototype.hasOwnProperty.call(obsidian, key) && key !== "default") {
    Object.defineProperty(obsidian, key, { get: () => obsidian_import[key], enumerable: true });
  }
}

Object.defineProperties(exports, {
  __esModule: { value: true },
  default: { 
    get: () => ColoredTextPlugin,
    enumerable: true
  }
});

var ColoredTextPlugin = class extends obsidian.Plugin {
  onload() {
    this.links = document.getElementsByClassName("internal-link");
    if (!this.hasOwnProperty("observer")) {
      this.observer = new MutationObserver(_ => this.onmutation());
    }
    this.observer.observe(document, {subtree: true, childList: true});
  }

  onmutation() {
    for (let link of Array.from(this.links)) {
      if (link.getAttribute('href') == 'c') {
        var elem = document.createElement('span');
        elem.style.color = link.hasAttribute('title') ? link.getAttribute('title') : 'inherit';
        elem.append(...Array.from(link.childNodes));
        link.parentNode.insertBefore(elem, link);
        link.remove();
      }
    }
  }

  onunload() {
    this.observer.disconnect();
  }
}
