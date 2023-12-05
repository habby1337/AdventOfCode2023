
import {longText, smallText} from './inputs.ts'
const wordMap: {[key: string]: number } = {
  'one': "1",
  'two': "2",
  'three': "3",
  'four': "4",
  'five': "5",
  'six': "6",
  'seven': "7",
  'eight': "8",
  'nine': "9",
}

const inputs = longText.trim().split('\n');


console.log("Inputs: ", inputs)



const firstNumberWordsRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  .join('|')
)

const lastNumberWordsRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  .join('|').split('').reverse().join('')
)



const values = inputs.map((string) => {

  let firstNumberIndex = string
    .split('')
    .findIndex((v) => !Number.isNaN(Number(v)));

  
  let firstWordMatch = string
    .match(firstNumberWordsRegExp);
  
  let firstWordNumberIndex = firstWordMatch?.index;

  let firstNumber = firstNumberIndex != -1 
    ? firstWordMatch 
      ? firstNumberIndex < firstWordNumberIndex 
        ? string[firstNumberIndex] 
         : wordMap[firstWordMatch[0]]
      : string[firstNumberIndex]
    : wordMap[firstWordMatch[0]];
  
  let lastNumberIndex = string
    .split('')
    .findLastIndex((v) => !Number.isNaN(Number(v)));

  let lastWordMatch = string
    .split('')
    .reverse()
    .join('')
    .match(lastNumberWordsRegExp);

  let lastWordNumberIndex = lastWordMatch ? string.length - 1 - lastWordMatch.index : null;

  let lastNumber = lastNumberIndex != -1 
  ? lastWordMatch 
    ? lastNumberIndex > lastWordNumberIndex 
      ? string[lastNumberIndex] 
       : wordMap[lastWordMatch[0].split('').reverse().join('')]
    : string[lastNumberIndex]
  : wordMap[lastWordMatch[0].split('').reverse().join('')];

  console.log(`${firstNumber}, ${lastNumber}`);
  
  return Number(firstNumber + lastNumber);
  
    

})

console.log(values.reduce((s, v) => s + v))
