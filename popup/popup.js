import {
  getWordsWithSubstring,
  sortByLengthAndAlphabetical,
} from '../scripts/helper.js';

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
    await setWords(request.syllable);
  }
});

function injectContent(tab) {
  const { id, url } = tab;

  //there are multiple iframes on the game page so send to all
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: ['./scripts/content.js'],
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

  syllableElement.innerText = `Syllable: ${substring}`;

  matchesElement.innerText = new Intl.ListFormat('en', {
    style: 'short',
    type: 'unit',
  }).format(matchedWords.slice(0, 50));
}

getCurrentTab().then((tab) => {
  injectContent(tab);
});
