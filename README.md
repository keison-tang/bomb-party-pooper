# bomb-party-pooper

Chrome extension that provides word hints while playing [Bomb Party](https://jklm.fun/)

[YouTube demo](https://youtu.be/djbJzNJ8thU)

[![screenshot](https://i.ytimg.com/vi/djbJzNJ8thU/maxresdefault.jpg)](https://youtu.be/djbJzNJ8thU)

## How to install

- Clone/download repo
- Load unpacked extension

https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked

## How to use

When playing Bomb Party, click the extension icon to activate the extension.

Or even better, set a shortcut in your browser settings to activate it, saving you vital milliseconds! Make sure you pick a shortcut combination that is unused.

Once activated, it will display up to 50 of the shortest words that contain the detected syllable.

### Lazy Mode

Head to extension options to enable **Lazy Mode**.

When the extension is activated and it's your turn, it will randomly pick one of the displayed hint words and type it into the input.

You still have to submit it yourself by hitting the enter key.

Use at your own risk. Not responsible for ruined friendships! 🐸☕

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
