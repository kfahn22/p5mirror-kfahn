// CC #48 White House Social Media Data Visualization
// Daniel shiffman
// https://thecodingtrain/challenges/content/videos/challenges/48-white-house-social-media-data-visualization

// Obamathon
// https://github.com/ITPNYU/Obamathon
// YouTube video tutorial: https://youtu.be/UrznYJltZrU


// All data
var potus;

// An object with a property for each month
var counts = {};

// List of words to ignore
// This is silly and a better strategy would be to load from a text files
// or use an algorithm like TF-IDF to pick out unique words
var ignore = {
  "the": 'true',
  "to": 'true',
  "we": 'true',
  "of": 'true',
  "and": 'true',
  "a": 'true',
  "http": 'true',
  "https": 'true',
  "our": 'true',
  "first": "true",
  "lady": "true",
  "flotus": "true"
}

// Load the data
function preload() {
  potus = loadJSON('flotus.json');
  myfont = loadFont('Cubano.ttf');
}

function mousePressed() {
  save('obama.jpg');
}
function setup() {
  createCanvas(810, 450);
  //angleMode(DEGREES);
  var tweets = potus.tweets;
  // Look at every tweet
  for (var i = 0; i < tweets.length; i++) {
    var date = new Date(...tweets[i].timestamp.split(/[\: -]/));
    // Determine month and year
    var month = date.getMonth();
    var year = date.getFullYear();
    var key = month + '/' + year;

    // Increase the count by 1 for each tweet
    if (counts.hasOwnProperty(key)) {
      counts[key].total++;
    } else {
      counts[key] = {
        total: 1,
        // Initialize an object to hold a words table for each month
        words: {}
      };
    }

    // Tweet text
    var txt = tweets[i].text;
    // Split up the words
    // The regex could be improved to deal with apostrophes and other
    // non word data.
    var words = txt.split(/\W+/);

    // Count each time a word appears
    for (var j = 0; j < words.length; j++) {
      var word = words[j].toLowerCase();
      if (word.length > 0) {
        if (counts[key].words.hasOwnProperty(word)) {
          counts[key].words[word]++;
        } else {
          counts[key].words[word] = 1;
        }
      }
    }

  }
  background('#70327E');
  textSize(35);
  stroke(255);
  fill(255);
  //text('Obama Word Count by Date Example', 10, 45);
  // Reverse the order
  var months = Object.keys(counts);
  months.reverse();

  // Normalize all the data by finding the maximum number
  var maxtweets = 0;
  for (var i = 0; i < months.length; i++) {
    var month = months[i];
    var num = counts[month].total;
    if (num > maxtweets) {
      maxtweets = num;
    }
  }
  //var w = width / months.length;
  var w = width / 24;

  // Graph the data
  //for (var i = 0; i < months.length; i++) {
  for (var i = 24; i >0; i--) {
    var month = months[i];
    var num = counts[month].total;
    // Height of bar is number of tweets
    var h = map(num, 0, maxtweets, 0, 500);
    noStroke()
    fill('#2DC5F4');
    rect( w * (i - 1), height*2/3-h, w - 8, h);

    // Find the word with the largest counts
    // This could be improved.
    var wordCounts = counts[month].words;
    var words = Object.keys(wordCounts);
    var biggest = 0;
    var biggestWord = '';
    for (var j = 0; j < words.length; j++) {
      var word = words[j];
      if (wordCounts[word] > biggest && !ignore[word] && word.length > 3) {
        biggest = wordCounts[word];
        biggestWord = word;
      }
    }
    // Draw the word
    textFont(myfont);
    push();
    fill(255);
    //translate(i * w, height*3/4 - 5);
    translate(i * w - w +5, height*2/3 + 15);
    rotate(PI * 5/12);
    textSize(18);
    //rect(i * w, height* 3/4 - h, w - 1, h);
    text(biggestWord, 0, 0);
    pop();
    //text(int(angleRotate) % 360 + " DEGREES ", 0, 0);
  }
  
}