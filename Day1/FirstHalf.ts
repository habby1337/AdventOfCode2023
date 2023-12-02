


const longText = `
  threehqv2
  ...long strings
  fiveeight792eightqskstrftdpccsrgskrhc
  26fmrrhhpthree6b`

const inputs = longText.trim().split('\n');



const isNumber = (n: string) => {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};
const allNumbers = [];
for (let j = 0; j < inputs.length; j++) {
  const numberArray = [];
  const string = inputs[j];
  for (let i = 0; i < string.length; i++) {
    const word = string[i];

    if (isNumber(word)) {
      numberArray.push(Number(word));
    }
  }
 
  const concatenatedNumber = Number(`${numberArray[0]}${numberArray[numberArray.length -1]}`)
  allNumbers.push(concatenatedNumber)

}

console.log(allNumbers)
const sum = allNumbers.reduce((a, b) => a + b, 0);
console.log(sum);
