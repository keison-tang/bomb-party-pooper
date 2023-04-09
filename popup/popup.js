import { GetWords, WordContainsSubstring } from '../scripts/helper.js';

// const syllable = document.getElementsByClassName('syllable');
// console.log(syllable);

const div = document.getElementById('matchedWords');

let matchedWords = [];

async function FindWords(substring) {
  const words = await GetWords();

  words.forEach((word) => {
    if (WordContainsSubstring(word, substring)) {
      matchedWords.push(word);
    }
  });
}

await FindWords('az');

div.innerText = new Intl.ListFormat('en', {
  style: 'short',
  type: 'unit',
}).format(matchedWords);
