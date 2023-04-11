/**
 * Async since the content script doesn't need a response
 *
 * @param {string} syllable
 */
function sendMessage(syllable) {
  const json = {
    action: 'SendSyllable',
    syllable: syllable,
    isSelfTurn: isSelfTurn(),
  };

  console.log('Sending message from content.js ' + JSON.stringify(json));

  chrome.runtime.sendMessage(json);
}

/**
 * Indicates whether or not it is the player's turn.
 *
 * If selfTurn or round (parent element of selfTurn) has the hidden attribute,
 * then it's not the player's turn
 *
 * @returns boolean
 */
function isSelfTurn() {
  const selfTurnElement = document.getElementsByClassName('selfTurn')[0];

  if (!selfTurnElement) {
    return false;
  }

  const selfTurnHiddenAttribute =
    selfTurnElement.attributes.getNamedItem('hidden');

  const parentElement = selfTurnElement.parentElement;
  const parentElementHiddenAttribute =
    parentElement.attributes.getNamedItem('hidden');

  if (selfTurnHiddenAttribute || parentElementHiddenAttribute) {
    return false;
  }

  return true;
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
