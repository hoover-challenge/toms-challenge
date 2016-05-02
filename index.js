'use strict'


const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('alice-in-wonderland.txt')
});

rl.on('line', (line) => {
  parseText(line);
});

rl.on('close', function(){
  createBigrams();
  sortBigrams();
});


let wordMap = new Map();

let bigramsMap = new Map();

let wordList = [];

function parseText(line){
  let words = line.split(/\W+/);

  for (let word of words){
    if (word != ''){
      wordList.push(word.toLowerCase());
    }
  }
}

function createBigrams(){

  for (let i = 0; i < wordList.length; i++){
    if (i != wordList.length - 1){
      let key = wordList[i] + ',' + wordList[i + 1];

      let count = bigramsMap.get(key);

      if (!count){
        count = 0;
      }

      count = count + 1;

      bigramsMap.set(key, count);
    }
  }


}


function parse(line){

  let words = line.split(/\W+/);




  for (let word of words){

    word = word.toLowerCase();

    let count = wordMap.get(word);

    if (!count){
      count = 0;
    }

    count = count + 1;

    wordMap.set(word, count);
  }
}

function sortMap(){

  let wordList = [];


  for (var key of wordMap.keys()) {
    wordList.push([key,wordMap.get(key)]);
  }

  wordList.sort(function(a,b){

    return a[1] - b[1];

  });

  console.log(wordList);
}

function sortBigrams(){

  let bigramList = [];


  for (var key of bigramsMap.keys()) {
    bigramList.push([key,bigramsMap.get(key)]);
  }

  bigramList.sort(function(a,b){

    return a[1] - b[1];

  });

  console.log(bigramList);
}
