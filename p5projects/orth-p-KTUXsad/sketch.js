


// from: https://melvingeorge.me/blog/check-if-string-contain-emojis-javascript
const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

let wordle = [];

function onInput(inputEl) {
  //   This takes the users text input from the text
  //   area and splits it into an array at each new line char
  const splitInput = inputEl.target.value.split("\n");
  console.log(splitInput);

  //   This uses a general emoji regex to filter out the
  //   array elements that do not contain emojis
  //   this could also be achieved without filter by looping
  //   thru the array and pushing the truthy element into another arr
  const onlyEmojis = splitInput.filter((line) => {
    if (emojiRegex.test(line)) return line;
  });
  console.log(onlyEmojis);

  //   Flattens the array of emoji rows into an array of
  //   individual emoji characters.
  const emojiArr = Array.from(onlyEmojis.join(""));
  console.log(emojiArr);

  //   We can either use the above array or transform the data
  //   into something more useful for our application e.g.
  const transformedData = emojiArr.map((emoji) => {
    if (emoji === "⬜" || emoji === "⬛") return "blank";
    if (emoji === "🟨") return "yellow";
    if (emoji === "🟩") return "green";
  });
  console.log(transformedData);

  wordle = transformedData;
}

// function setup() {
//   createCanvas(400, 400);
//   //   using textarea over input so that line breaks are preserved
//   const textArea = createElement("textarea");
//   textArea.input(onInput);
// }

// function draw() {
//   background(220);
//   if (wordle.length) {
//     //   loop through our isometric shapes and index into the wordle array
//     //    to check what colour they should be :D
//   }
// }

// function parseWordle() {
  
// }
function setup() {
  createCanvas(400, 400, WEBGL);
  
   //   using textarea over input so that line breaks are preserved
  const textArea = createElement("textarea");
  textArea.input(onInput);
  
  const hw = width* 0.5;
  ortho(-hw, hw, hw, -hw, -1500, 1500);
}


function draw() {
  background(200);
 
  
 // w is r
  const r = 40;
  const d = r/sqrt(2);
  const cols = 5;
  const rows = 6;
  
  for (let i  = 0; i < cols; i++) {
    for (let j = 0; j < rows; j ++) {
      push();
      const x = -0.5*(cols -1 ) * r + i * r + (j%2)*r*0.5 ;
      h = (d+r) * 0.5;
      const y = -0.5*(rows -1 ) * h + j * h ;
      translate(x, y, -200);
      stroke(0);
      
      
      const index = i + j * cols;
      
      
      
      //const cc = wordle.chareAt(index);
      // if (cc == '') filll(255);
      // if (cc == '') filll(0,255,0);
            
            
      fill(150);
      rotateX(PI/4);
      rotateY(PI/4);
      box(d);
      pop();
    }
  }
  
  //   if (wordle.length) {
  //   //   loop through our isometric shapes and index into the wordle array
  //   //    to check what colour they should be :D
  // }
 noLoop();
}