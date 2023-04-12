import {
  getWordsWithSubstring,
  sortByLengthAndAlphabetical,
} from '../scripts/helper.js';

const CONTENT_SCRIPT_PATH = './scripts/content.js';
const CONTENT_INPUT_SCRIPT_PATH = './scripts/content-input.js';

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(
    `Popup received message from content script ${
      sender.tab?.url
    } ${JSON.stringify(request)}`
  );

  if (request.action === 'SendSyllable') {
    const words = await setWords(request.syllable);

    if (request.isSelfTurn) {
      getCurrentTab().then(async (tab) => {
        const { id, url } = tab;

        //there are multiple iframes on the game page so send to all
        await chrome.scripting.executeScript({
          target: { tabId: id, allFrames: true },
          files: [CONTENT_INPUT_SCRIPT_PATH],
        });

        console.log(`Loading: ${url}`);

        const randomWord = words[Math.floor(Math.random() * words.length)];

        await chrome.tabs.sendMessage(tab.id, {
          action: 'SendInput',
          wordToInput: randomWord,
        });
      });
    }
  }
});

function injectContent(tab, contentScriptPath) {
  const { id, url } = tab;

  //there are multiple iframes on the game page so send to all
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: [contentScriptPath],
  });

  console.log(`Loading: ${url}`);
}

async function getCurrentTab() {
  const queryOptions = { active: true };

  //destructuring assignment [tab] gets first in array
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

async function setWords(substring) {
  const syllableElement = document.getElementById('syllable');
  const matchesElement = document.getElementById('matchedWords');

  let matchedWords = await getWordsWithSubstring(substring);
  sortByLengthAndAlphabetical(matchedWords);
  matchedWords = matchedWords.slice(0, 50);

  syllableElement.innerText = `Syllable: ${substring}`;

  matchesElement.innerText = new Intl.ListFormat('en', {
    style: 'short',
    type: 'unit',
  }).format(matchedWords);

  return matchedWords;
}

getCurrentTab().then((tab) => {
  injectContent(tab, CONTENT_SCRIPT_PATH);
});
