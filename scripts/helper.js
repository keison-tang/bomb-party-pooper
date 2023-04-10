export { getWordsWithSubstring };

const url = chrome.runtime.getURL('words.txt');

/**
 * Returns array of words from text file
 *
 * @returns string[]
 */
async function getWords() {
  const response = await fetch(url);
  const text = await response.text();

  return text.split(/\r?\n/);
}

/**
 * Returns array of words containing input substring
 *
 * @param {string} substring
 * @returns string[]
 */
async function getWordsWithSubstring(substring) {
  let matchedWords = [];

  const words = await getWords();

  words.forEach((word) => {
    if (wordContainsSubstring(word, substring)) {
      matchedWords.push(word);
    }
  });

  return matchedWords;
}

/**
 * Case insensitive version of String.includes()
 *
 * @param {string} word
 * @param {string} substring
 * @returns boolean
 */
function wordContainsSubstring(word, substring) {
  return word.toLowerCase().includes(substring.toLowerCase());
}
