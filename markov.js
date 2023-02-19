
const fs = require('fs');

const limit = 65

const text = fs.readFileSync('textFiles/text.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data);
  return data
  
});

const nWords = text.split(" ").length

function generateText(text, length) {
  const words = text.split(" ");
  const chain = {};


 
  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    const nextWord = words[i + 1];

    if (!chain[currentWord]) {
      chain[currentWord] = [];
    }

    chain[currentWord].push(nextWord);
  }

  

  
  let currentWord = words[0];
  let result = currentWord;

  for (let i = 0; i < length; i++) {
    const nextWordOptions = chain[currentWord];
    const nextWord = nextWordOptions[Math.floor(Math.random() * nextWordOptions.length)];
    result += " " + nextWord;
    currentWord = nextWord;
  }
  
  return result;
}


 const generatedText =  generateText(text , nWords )


function splitText(text , limit){
  if(!text){
    return []
  }


  const words = text.trim().split(/\s+/)
  
  if(words.length <= limit){
    return[words.join(' ')]
  }

  
  const firstChunk = words.slice(0,limit).join(' ')
  const restOfText = words.slice(limit).join(' ')

  const chunks = splitText(restOfText , limit)

  return [firstChunk , ...chunks]

}


const chunks = splitText(generatedText , limit)



for(i = 0 ;  i < chunks.length ; i++){
console.log(chunks[i])
console.log()
}



