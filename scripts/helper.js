export { getWordsWithSubstring, sortByLengthAndAlphabetical };

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

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (wordContainsSubstring(word, substring)) {
      matchedWords.push(word);
    }
  }

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

/**
 * In place sorting of an array by length and then alphabetically
 *
 * @param {string[]} array
 */
function sortByLengthAndAlphabetical(array) {
  array.sort(function (a, b) {
    return a.length - b.length || a.localeCompare(b);
  });
}
