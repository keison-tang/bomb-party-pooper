/**
 * window.contentInputScriptInjected
 * global scoped flag that will prevent duplicate listener registration as this script
 * gets injected multiple times
 *
 * explicit true check to avoid false positives on pages with element id with same name
 *
 * if element has id contentInputScriptInjected, the value will be truthy
 */
if (window.contentInputScriptInjected !== true) {
  window.contentInputScriptInjected = true;

  chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) {
    console.log('content-input script onMessage listener registered');
    console.log(`Received message from popup ${JSON.stringify(request)}`);

    if (request.action === 'SendInput') {
      await typeInput(request.wordToInput);
    }
  });
}

async function typeInput(wordToInput) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const selfTurnElelement = document.getElementsByClassName('selfTurn')[0];
  const formElement = selfTurnElelement?.firstElementChild;
  const inputElement = formElement?.firstElementChild;

  if (!inputElement) {
    return;
  }

  console.log(inputElement);

  for (let i = 0; i < wordToInput.length; i++) {
    const letter = wordToInput[i];

    await timer(100);
    await timer(Math.random() * 500);

    inputElement.value += letter;
  }
}
