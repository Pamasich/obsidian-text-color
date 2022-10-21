# Colored Text for Obsidian

This plugin aims to provide easy text coloring to Obsidian, without having to fall back to HTML or snippets, nor limiting you to only a small subset of colors. Any valid CSS color can be used, including rbg(a), hsl(a), color names ("red"), anything.

This is currently done by abusing the link syntax and replacing links with a special pattern in the reading view with a colored `<span>` element instead, copying over all child elements.

This does not work in the live preview currently, and I don't consider it a priority to change that.

##### Usage

`[Text](c "color")`

You simply create a link, but instead of an address, you put in a `c` followed by a quoted color. This color can be any valid CSS color value.

##### Installation

Take the files in this repository and throw them in a new folder under the `.obsidian/plugins` folder of your vault.