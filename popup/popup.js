import { GetWords, WordContainsSubstring } from '../scripts/helper.js';

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
    await FindWords(request.syllable);
  }
});

function InjectContent(tab) {
  const { id, url } = tab;

  //there are multiple iframes on the game page so send to all
  chrome.scripting.executeScript({
    target: { tabId: id, allFrames: true },
    files: ['./scripts/content.js'],
  });
  console.log(`Loading: ${url}`);
}

async function GetCurrentTab() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

GetCurrentTab().then((tab) => {
  InjectContent(tab);
});

async function FindWords(substring) {
  const div = document.getElementById('matchedWords');

  let matchedWords = [];

  const words = await GetWords();

  words.forEach((word) => {
    if (WordContainsSubstring(word, substring)) {
      matchedWords.push(word);
    }
  });

  //todo sort

  div.innerText = new Intl.ListFormat('en', {
    style: 'short',
    type: 'unit',
  }).format(matchedWords);
}
