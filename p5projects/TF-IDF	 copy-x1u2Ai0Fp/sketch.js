// Word Counting
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/040.3-tf-idf.html

let txt = [];
let counts = {};
let keys = [];
let allwords = [];

let files = ['rainbow.txt', 'sports.txt', 'eclipse.txt', 'fish.txt'];

function preload() {
  for (let i = 0; i < files.length; i++) {
    txt[i] = loadStrings('files/' + files[i]);
  }
}

function setup() {
  for (let i = 0; i < txt.length; i++) {
    allwords[i] = txt[i].join("\n");
  }

  // This is where the document is chosen!
  // index 0 is 'rainbow.txt', try other 
  let tokens = allwords[0].split(/\W+/);
  
  for (let i = 0; i < tokens.length; i++) {
    let word = tokens[i].toLowerCase();
    if (counts[word] === undefined) {
      counts[word] = {
        tf: 1,
        df: 1
      };
      keys.push(word);
    } else {
      counts[word].tf = counts[word].tf + 1;
    }
  }

  let othercounts = [];
  for (let j = 1; j < allwords.length; j++) {
    let tempcounts = {};
    let tokens = allwords[j].split(/\W+/);
    for (var k = 0; k < tokens.length; k++) {
      var w = tokens[k].toLowerCase();
      if (tempcounts[w] === undefined) {
        tempcounts[w] = true;
      }
    }
    othercounts.push(tempcounts);
  }



  for (var i = 0; i < keys.length; i++) {
    let word = keys[i];
    for (var j = 0; j < othercounts.length; j++) {
      var tempcounts = othercounts[j];
      if (tempcounts[word]) {
        counts[word].df++;
      }
    }
  }

  for (var i = 0; i < keys.length; i++) {
    let word = keys[i];
    let wordobj = counts[word];
    wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
  }


  keys.sort(compare);

  function compare(a, b) {
    let countA = counts[a].tfidf;
    let countB = counts[b].tfidf;
    return countB - countA;
  }

  for (var i = 0; i < keys.length; i++) {
    let key = keys[i];
    createDiv(key + " " + counts[key].tfidf);
  }

  noCanvas();
}