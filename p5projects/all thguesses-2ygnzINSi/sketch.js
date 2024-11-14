let guesses = [];

function setup() {
    createCanvas(300,300);
}

function draw() {
    let w = 20;
    let h = 20;
     allOptions();
   //console.log(codes.length);
    stroke(255);
   textFont('Courier');
  textSize(15);
    textAlign(LEFT, CENTER);
  for (let i = 0; i < 4; i++) {
    console.log(guesses);
  }
    // for (let i = 0; i < 20; i ++) {
    //   //guesses[1].rtSpot = "FTTT";
    //  text(guesses[i].combination, 5 * w + w * 0.5, i * h + h * 0.5);
    //}
 noLoop();
  
}

function allOptions() {
  let moves = ["G", "R", "B", "P"];
  
  // generate all possible moves
   for (let m = 0; m < 256; m++) {
    for (let i = 0; i < moves.length; i++) {
      for (let j = 0; j < moves.length; j++) {
        for (let k = 0; k < moves.length; k++) {
          for (let l = 0; l < moves.length; l++) {
            let newcode = moves[i] + moves[j] + moves[k] + moves[l];
           
              guesses[m] = {
                code: newcode,
                //code: moves[i] + moves[j] + moves[k] + moves[l],
                alreadyplayed: "false",
                feedbackSpot: "FFFF",
                feedbackColor: "FFFF"
              };
            }
          }
        }
      }
    }
  }
