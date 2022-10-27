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
    get: () => TextColorPlugin,
    enumerable: true
  }
});

// Start of plugin code

// A MutationObserver is used to trigger checking for new links to convert
let observer;
// A live collection of elligible links
let liveLinks;

let getWorkspaceNode = () => {
  return new Promise(resolve => {
    // If it already exists, return it
    let found = document.querySelector('.workspace-split.mod-root');
    if (found) return resolve(found);
    // If it doesn't exist yet, wait for it to appear
    const observer = new MutationObserver(() => {
      found = document.querySelector('.workspace-split.mod-root');
      if (found) {
        resolve(found);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  })
}

// Do this when the MutationObserver triggers.
let onMutation = () => {
  Array.from(liveLinks)
    .filter(link => link.getAttribute('href') === 'c')
    .filter(link => link.getAttribute('title'))
    .forEach(link => applyTextColor(link));
}

let applyTextColor = (link) => {
  let elem = document.createElement('span');
  elem.style.color = link.getAttribute('title');
  elem.append(...Array.from(link.childNodes));
  link.parentNode.insertBefore(elem, link);
  link.remove();
}

var TextColorPlugin = class extends obsidian.Plugin {
  onload() {
    getWorkspaceNode().then(workspaceNode => {
      if (liveLinks === undefined) liveLinks = workspaceNode.getElementsByClassName('internal-link');
      if (observer === undefined) observer = new MutationObserver(onMutation);
      observer.observe(workspaceNode, {subtree: true, childList: true});
    });
  }

  onunload() {
    observer.disconnect();
  }
}
