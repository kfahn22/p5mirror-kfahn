// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ziBO-U2_t3k

// The 2020 tabletop.js has been deprecated due to changes made by Google. 😦
// To learn moremore about it, visit https://github.com/jsoma/tabletop

// In this code example, the Tabletop library has been replaced with Papa Parse.
// https://www.papaparse.com
// Note that the Google Sheet link is now to a CSV link instead of a webpage.

var data;

var txt = '$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$.';

var txt = 'The meaning of $$Noun$$, the $$Noun$$, and $$Noun$$ is $$Noun$$.';

// Load the data
function preload() {
  myfont = loadFont('Cubano.ttf');
}

// function mousePressed() {
//   save('madlib.jpg');
// }
function setup() {
  noCanvas();

// Tabletop.init({
//   key: '15WyEmfu6B1UCzzqeacYnzI8lutrxF6uWvFDiSteBqTs',
//   callback: gotData,
//   simpleSheet: true
// });
  
// We will call the Papa Parse library instead of Tabletop
 
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vSiJDczupcvlAJxd70RJ9hZina9cqweCiTj1EkYrH_17FhFBjdMFTEY2TOMmhwGBHGR05y7QRXLNbo6/pub?output=csv', {
     download: true,
     header: true,
     complete: function(results) {
       var stuff = results.data
       data = stuff
     }
   })
  var button = createButton('generate madlib');
  button.mousePressed(generate);
}

function replacer(match, pos) {
  var entry = random(data);
  return entry[pos];
}


function generate() {
  //console.log('generate');
  var madlib = txt.replace(/\$\$(.*?)\$\$/g, replacer);
  createP(madlib);
}

// function gotData(stuff, tabletop) {
 //   data = stuff;
 // }