export { GetWords, WordContainsSubstring };

const url = chrome.runtime.getURL('words.txt');

/**
 * Returns array of words from text file
 *
 * @returns string[]
 */
async function GetWords() {
  const response = await fetch(url);
  const text = await response.text();

  return text.split(/\r?\n/);
}

/**
 * Case insensitive version of String.includes()
 *
 * @param {string} word
 * @param {string} substring
 * @returns boolean
 */
function WordContainsSubstring(word, substring) {
  return word.toLowerCase().includes(substring.toLowerCase());
}
