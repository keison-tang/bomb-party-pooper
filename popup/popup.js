import { getWordsWithSubstring } from '../scripts/helper.js';

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
    await findWords(request.syllable);
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
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

getCurrentTab().then((tab) => {
  injectContent(tab);
});

async function findWords(substring) {
  const div = document.getElementById('matchedWords');

  let matchedWords = await getWordsWithSubstring(substring);

  //todo sort

  div.innerText = new Intl.ListFormat('en', {
    style: 'short',
    type: 'unit',
  }).format(matchedWords);
}
