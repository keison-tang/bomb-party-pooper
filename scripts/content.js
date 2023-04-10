/**
 * Async since the content script doesn't need a response
 *
 * @param {string} syllable
 */
function SendMessage(syllable) {
  const json = {
    action: 'SendSyllable',
    syllable: syllable,
  };

  console.log('Sending message from content.js ' + JSON.stringify(json));

  chrome.runtime.sendMessage(json);
}

function FindSyllable() {
  const syllableElements = document.getElementsByClassName('syllable');

  console.log(syllableElements);

  if (syllableElements[0]?.innerText) {
    SendMessage(syllableElements[0].innerText);
  }
}

FindSyllable();
