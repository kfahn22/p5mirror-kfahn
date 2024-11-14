// thecodingtrain.com/challenges/73-acrostic
// Acrostic YouTube video: https://youtu.be/jwoK5WKVXGw

// Version 4 of the Wordnik API is currently unavailable.  The Datamuse API has been substituted as an endpoint.  
// https://www.datamuse.com/api/

let url1 = 'https://api.datamuse.com/words?';

function setup() {
  noCanvas();
  let button = select('#submitbutton');
  let input = select('#wordinput');
  let resultsDiv = select('#results');

  button.mousePressed(makeAcrostic);

  function pickWord(div, letter, word) {
    let url = `${url1}sp=${letter}*&ml=${word}&max=5`;
    loadJSON(url, gotData);

    function gotData(data) {
      // Error checking has been added to code
      if (data.length > 0) {
        options = data;
        let selection = random(options);
        div.html(selection.word);
      } else {
        div.html('No matching word!');
      }
    }
  }

  function makeAcrostic() {
    resultsDiv.html(''); // Clear previous results
    let word = input.value().toUpperCase();

    for (let i = 0; i < word.length; i++) {
      let letter = word.charAt(i);
      let div = createDiv('').parent(resultsDiv);
      pickWord(div, letter, word);
    }
  }
}
