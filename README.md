# bomb-party-pooper

Provides word hints while playing Bomb Party

## Word list

25,322 words

https://github.com/dolph/dictionary

`popular.txt`

## Dev notes

- console.log in popup is different to console.log in a content script!!! SMH
- To see popup console, inspect the popup as it's a self contained webpage

With manifest v3

- Popup does not have access to page
- Tried using background service worker however it is documented that an action event listener will not fire if the action opens a popup
- New strategy
  - Popup injects content script
  - Content script reads page and sends message to popup
  - Popup listens for message
  - https://github.com/macro6461/popup-content-script

### Optional npm package for dev

chrome-types helps with chrome api autocomplete in vscode

`npm i chrome-types`
