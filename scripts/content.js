/**
 * Async since the content script doesn't need a response
 *
 * @param {string} syllable
 */
function sendMessage(syllable) {
  const json = {
    action: 'SendSyllable',
    syllable: syllable,
  };

  console.log('Sending message from content.js ' + JSON.stringify(json));

  chrome.runtime.sendMessage(json);
}

function findSyllable() {
  const syllableElements = document.getElementsByClassName('syllable');

  if (syllableElements.length) {
    console.log(syllableElements);
  }

  if (syllableElements[0]?.innerText) {
    sendMessage(syllableElements[0].innerText);
  }
}

findSyllable();
