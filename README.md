# Text Color for Obsidian

Leverages links with a special syntax to implement text color in Markdown.

Example:  
`[**Text**](c "yellow")`  
The above creates a bold yellow "Text".

Any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) is supported.

Currently this plugin only works with the reading view. I have had no luck deciphering the live preview's HTML so far.
If you do need text color in the live preview, use HTML:  
`<span style="color: yellow">Your text</span>`.

### Installation

Take the files in this repository and throw them in a new folder under the `.obsidian/plugins` folder of your vault.