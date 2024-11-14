let data;

let months;
let count;
let zeroRadius = 50;
let oneRadius = 150;

function preload() {
  data = loadTable("giss-data-apr-11-2023.csv", "csv", "header");
   myfont = loadFont('Cubano.ttf');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  // console.log(data.getRowCount());
  // console.log(data.getColumnCount());

  //months = data.columns.slice(1, 13);
  months = [
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
  ];
  //console.log(months);

  let row = data.getRow(0);
  // console.log(row.get("Year"));
  // console.log(row.getNum("Jan"));
}

function draw() {
  background(0);
  //translate(width / 2, height / 2);

  textSize(16);
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, zeroRadius * 2);
  fill(255);
  noStroke();
  text("0°", zeroRadius + 10, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, oneRadius * 2);
  fill(255);
  noStroke();
  text("1°", oneRadius + 10, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 500);

  for (let i = 0; i < months.length; i++) {
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(24);
    let angle = map(i, 0, months.length, 0, 360);
    push();
    let x = 264 * cos(angle);
    let y = 264 * sin(angle);
    translate(x, y);
    rotate(angle + 180);
    text(months[i], 0, 0);
    pop();
  }

  beginShape();
  noFill();
  
  stroke(255);
  for (let j = 0; j < data.getRowCount(); j++) {
  //for (let j = 0; j < 100; j++) {
    let row = data.getRow(j);
    // let year = row.get("Year");
    // textAlign(CENTER, CENTER);
    // text(year, 0, 0);

    for (let i = 0; i < months.length; i++) {
      let anomaly = row.get(months[i]);
      if (anomaly !== '***') {
        // anomaly = Number(anomaly);
        let angle = map(i, 0, months.length, 0, 360) + 180;
        let r = map(anomaly, 0, 1, zeroRadius, oneRadius);

        let x = r * cos(angle);
        let y = r * sin(angle);
        let z = r;
        vertex(x, y, z);
       
      }
       count += 1;
    }
  }
  endShape();
  if (count == months.length - 1)
  (rotateZ(90));
 // noLoop();
}
