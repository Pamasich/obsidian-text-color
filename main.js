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

let workspaceNode;
let observer;
let liveLinks;

let getWorkspaceNode = () => Array.from(document.getElementsByClassName('workspace-split'))
  .filter(elem => elem.classList.contains('mod-root'))[0];

let onMutation = () => {
  Array.from(liveLinks)
    .filter(link => link.getAttribute('href') === 'c')
    .filter(link => link.getAttribute('title') !== undefined)
    .forEach(link => applyTextColor(link));
}

let applyTextColor = (link) => {
  let elem = document.createElement('span');
  elem.style.color = link.getAttribute('title');
  elem.append(...Array.from(link.childNodes));
  link.parentNode.insertBefore(elem, link);
  link.remove();
}

var ColoredTextPlugin = class extends obsidian.Plugin {
  onload() {
    if (workspaceNode === undefined) workspaceNode = getWorkspaceNode();
    if (liveLinks === undefined) liveLinks = workspaceNode.getElementsByClassName('internal-link');
    if (observer === undefined) observer = new MutationObserver(onMutation);
    observer.observe(workspaceNode, {subtree: true, childList: true});
  }

  onunload() {
    observer.disconnect();
  }
}
