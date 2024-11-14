//Taken from https://openprocessing.org/browse/#
//220708 Project % by Che-Yu Wu 
//p5.js shader basic structure ref from https://www.openprocessing.org/sketch/920144

let orbitShader;
let webGLCanvas;
let originalGraphics;
let factors = [], yFactors = [];
let light = "";
let hasBird;
let startHeight;
let mountainSpan;
let bgColor; 
let hasMoon;
let targetSunRaiseFactor = 0, sunRaiseFactor=-1;
let reduceMountainCount = 0;
let sunXPos = 0; 
//let birdCount = 0; 
let xScale = 1;
let endPoints = [];

// original canvas dim
// createCanvas(1080,1920);

function preload(){
	//theShader = new p5.Shader(this.renderer,vert, frag)
    orbitShader =loadShader('orbit.vert', 'orbit.frag');
}

function setup() {
	hasMoon = random()<0.5;
	pixelDensity(1);
	createCanvas(900,1600);
	webGLCanvas = createGraphics(width,height,WEBGL);
	originalGraphics = createGraphics(width,height);
	overlayGraphics = createGraphics(width,height);
	noStroke();
	startHeight = height*random(0.05,0.45);
	targetSunRaiseFactor =0.5
	mouseY = random(height*0.1,startHeight+ 0.2*height);
	background(0);
	//mountainSpan = int(random([7,12]))*15;
    mountainSpan = int(random([7,12]))*10;  // creates mountains
	//birdCount = random([0,10]);
	factors = [random(20,200),random(120),random(20,200),random(120),random(20,200),random(120)];
	yFactors = [random(100,200),random(400,600),random(100,150),random(100,150),random([0,50])];
	light = random(['day','night']);
	xScale = random(0.5,1);
    //xScale = random(0.5,1.5);
	
	reduceMountainCount = int(random(4,8));
	sunXPos = random(0.2,0.8)*width;
	mouseX = random(width*0.3,width*0.9);
	
	endPoints.push(createVector(0,getY(0,startHeight)),
								 createVector(width,getY(width,startHeight)));
}

function getY(_x,y){
	let x = _x*(xScale+noise(y*200));
	return y + noise(x/16,y)* noise(x/250,y)*yFactors[0]
					 + noise(x/200,y)*yFactors[1]
					 + noise(x/20,y)* noise(x/90,y)*yFactors[2]
					 + noise(x/500,y)*yFactors[3]
	         + yFactors[4]* map(noise(x/5,y/10),0,1,-1,1)* noise(x/2,y/20)* noise(x/4,y/4);
}

function draw() {
	originalGraphics.fill(255,5);
	if (light=='night'){
		originalGraphics.fill(0,5);
	
	}
	originalGraphics.fill(factors[0]*0.5,factors[2]/2,factors[4]/2);
	originalGraphics.rect(0,0,width,height);
	overlayGraphics.clear();
	
	targetSunRaiseFactor = map(mouseY,0,height,0,100,true);
	if (sunRaiseFactor==-1) sunRaiseFactor = targetSunRaiseFactor;
	sunRaiseFactor = lerp(sunRaiseFactor,targetSunRaiseFactor,0.1);

	for(var y=1000;y-=10;y>=0){
		let dk = sunRaiseFactor/1.5+5;
		let hy = (y-startHeight);
		let skyDarkFactor = 0.8;
	originalGraphics.stroke(factors[0]*skyDarkFactor+hy/50-dk,factors[2]*skyDarkFactor+hy/40-dk,factors[4]*skyDarkFactor-hy/30-dk);
			originalGraphics.strokeWeight(10);
		originalGraphics.line(0,y,width,y);
	}
	
	
	for(var i=0;i<25;i++){
		originalGraphics.strokeWeight(3);
		originalGraphics.noFill();
		originalGraphics.stroke(255,40);
		originalGraphics.circle(sunXPos,sunRaiseFactor/100*height,pow(i,1.5));
	}
	
	//cloud
	
// 	for(var i=0;i<40;i++){
// 		originalGraphics.push();
// 		originalGraphics.translate(0,noise(0,i/20)*height/2);
// 		originalGraphics.strokeWeight(1);
// 		originalGraphics.noStroke();
// 		originalGraphics.stroke(255,20);
// 		originalGraphics.line(0,0,width,0);
// 		originalGraphics.pop();
// 	}
	
	for(let y=startHeight;y<height-mountainSpan*reduceMountainCount;y+=mountainSpan){
		originalGraphics.push();
			originalGraphics.beginShape();
		originalGraphics.vertex(0,height);
		let xPan = map(mouseX,0,width,-1,1)*sqrt(y-startHeight+100);
		originalGraphics.translate(xPan,0);
		let points = [];
        for(let x=-50;x<=width +50; x+=10){
		//for(let x=-50;x<=width+50;x+=10){
			let yy = getY(x,y);
			
			if (y%(2*mountainSpan)==0 && x % 8==0){
				overlayGraphics.push();
				overlayGraphics.noStroke();
				overlayGraphics.fill(255,200);
				overlayGraphics.translate(x ,yy);
				overlayGraphics.rect(0,0,20,200);
                //overlayGraphics.rect(0,0,20,250);
				overlayGraphics.pop();

			}
			let rr = noise(x*10,y*10)*20
			originalGraphics.vertex(x,yy  );
		 
			points.push(createVector(x,yy)) ;
			originalGraphics.stroke(255);
			if (noise(x*10,yy*10)<0.8){

				originalGraphics.strokeWeight(noise(x/5,y/5)*4+0.1+1);
			
				if (noise(x*10,yy*10)<0.6){
					originalGraphics.stroke(factors[0] + (sin(x/5))*factors[1], 
																factors[2]+ sin(yy/5)*factors[3], 
																factors[4]+ sin(x+yy)*factors[5]) ;
				}else{
					originalGraphics.stroke(0);
				}
				originalGraphics.fill(factors[0] + (sin(x/5))*factors[1], 
																factors[2]+ sin(yy/5)*factors[3], 
																factors[4]+ sin(x+yy)*factors[5]) ;
               // Adds points
				// originalGraphics.ellipse(x+noise(x,yy)*20,
				// 												 yy+noise(yy,x)*20,rr,rr);
				if (noise(x*10,yy*10)<0.7){
					originalGraphics.push();
					originalGraphics.strokeWeight(1);
					originalGraphics.translate(x,yy);

					for(let i=0;i<30;i+=5){
						let lineLen = i*5+200;
						
						originalGraphics.line(0,0+i,lineLen,lineLen+i);
						originalGraphics.line(0,0+i,-lineLen,lineLen+i);
						originalGraphics.translate(0,10);
						originalGraphics.line(0,0+i,lineLen/3,lineLen/3+i);
						originalGraphics.line(0,0+i,-lineLen/3,lineLen/3+i);
						
						
						originalGraphics.stroke(factors[0] + (sin(x/5))*factors[1] - sunRaiseFactor*map(yy,0,height,0,2), 
																factors[2]+ sin(yy/5)*factors[3]- sunRaiseFactor*map(yy,0,height,0,2), 
																factors[4]+ sin(x+yy)*factors[5]- sunRaiseFactor*map(yy,0,height,0,2),
																		30 + map(yy,0,height,-20,20)) ;
						
						originalGraphics.line(0,0+i,lineLen*2,0);
						originalGraphics.line(0,0+i,-lineLen*2,0);
						
						if (noise(yy/10)<0.25) {
							originalGraphics.stroke(255,50);
							originalGraphics.line(0,0+i,lineLen*2,0);
							originalGraphics.line(0,0+i,-lineLen*2,0);
						}
						
						
						if (noise(i/50,yy/10)<0.25) {
							originalGraphics.stroke(0,50);
							originalGraphics.line(0,0+i,lineLen*2,0);
							originalGraphics.line(0,0+i,-lineLen*2,0);
						}
					}
					originalGraphics.pop();
				}
			}
		}
		originalGraphics.vertex(width,height);
		originalGraphics.vertex(0,height);
		
		let mistFactor = map(y,startHeight,height*0.7,1.1,0);
		originalGraphics.fill((factors[0] +factors[1])/10*mistFactor, 
													(factors[2]+ factors[3])/10*mistFactor, 
													(factors[4]+ factors[5])/10*mistFactor) ;

		originalGraphics.endShape();
      
		points.forEach( (p,pId)=>{
			originalGraphics.push();
			
				originalGraphics.stroke((factors[0] +factors[1]), 
													(factors[2]+ factors[3]), 
													(factors[4]+ factors[5]),noise(p.x/300)*80)  ;
				originalGraphics.strokeWeight(2);
				originalGraphics.translate(p.x,p.y);
				originalGraphics.rotate(noise(p.x/200)-0.5);
		
				for(let k=0;k<15;k++){
					let xx1=noise(p.x/20,k)*-25, yy1 = noise(p.x/20,k)*60;
					originalGraphics.line(0,0,xx1,yy1);
					originalGraphics.translate(xx1,yy1);
					originalGraphics.rotate(noise(xx1/10,yy1/10)/6);

				}
				originalGraphics.pop();
		})
		
		originalGraphics.pop();
		
		
	}

	
	
// 	for(var b=0;b<birdCount;b++){
	
// 		originalGraphics.push()
// 		originalGraphics.translate( noise(b)*width,  noise(b*50)*startHeight*1.2)
// 		originalGraphics.scale(noise(b*30)*0.5+0.2)
// 		originalGraphics.stroke(0)
// 		originalGraphics.strokeWeight(4)

// 		let sc = abs(sin(frameCount/10))/4
// 		originalGraphics.rotate(sc)
// 		originalGraphics.arc(0,0,20,20,PI*0.9,PI*2.1) 
// 		originalGraphics.rotate(-sc*2)
// 		originalGraphics.arc(-20,0,20,20,PI*0.9,PI*2.1)
// 		originalGraphics.pop()
	
// 	}

	orbitShader.setUniform('u_resolution',[width/1000,height/1000]);
	orbitShader.setUniform('u_time',millis()/1000);
	orbitShader.setUniform('u_mouse',[mouseX/width,mouseY/height]);
	orbitShader.setUniform('u_tex',originalGraphics);
	webGLCanvas.shader(orbitShader);
	webGLCanvas.clear();

    webGLCanvas.rect(-width/2,-height/2,width*1.0,height);
	//webGLCanvas.rect(-width/2,-height/2,width/2,height/2); only get 1st quadrant
	image(webGLCanvas,0,0);
	
	push();
		blendMode(MULTIPLY);
		image(overlayGraphics,0,0);
	pop();
	
	stroke(factors[0]*0.7+50,factors[2]*0.7+50,factors[4]*0.7+50);
	strokeWeight(50);
	noFill();
	rect(0,0,width,height);
}