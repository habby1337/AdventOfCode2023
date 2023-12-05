import { longText } from './inputs.ts';

const wordMap: { [key: string]: string } = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};

function findNumberIndices(str: string, isLast: boolean): number[] {
  const digitIndices = str.split('').map((char, index) => (!Number.isNaN(Number(char)) ? index : -1)).filter((index) => index !== -1);
  return isLast ? [Math.max(...digitIndices)] : [Math.min(...digitIndices)];
}

function extractNumber(index: number, match: RegExpMatchArray | null, str: string, isLast: boolean): string {
  if (index !== -1) {
    if (match) {
      const wordNumberIndex = match.index;
      return index < wordNumberIndex ? str[index] : wordMap[match[0]];
    }
    return str[index];
  }
  return match ? wordMap[match[0]] : '';
}

function processString(str: string): number {
  const firstWordMatch = str.match(/one|two|three|four|five|six|seven|eight|nine/);
  const reversedStr = str.split('').reverse().join('');
  const lastWordMatch = reversedStr.match(/one|two|three|four|five|six|seven|eight|nine/);

  const [firstNumberIndex] = findNumberIndices(str, false);
  const [lastNumberIndex] = findNumberIndices(reversedStr, true);

  const firstNumber = extractNumber(firstNumberIndex, firstWordMatch, str, false);
  const lastNumber = extractNumber(str.length - 1 - lastNumberIndex, lastWordMatch, str, true);

  console.log(`${firstNumber}, ${lastNumber}`);
  return Number(firstNumber + lastNumber);
}

const inputs = longText.trim().split('\n');
const values = inputs.map(processString);

console.log(values.reduce((sum, value) => sum + value));
