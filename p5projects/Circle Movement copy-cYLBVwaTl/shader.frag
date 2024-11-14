#ifdef GL_ES
precision mediump float;
#endif

#define width 800.
#define height 450.
#define numColors 10
#define numCircles 100

uniform vec2 iResolution;
uniform int iFrame;
uniform vec2 iMouse;
uniform float iTime;
//varying vec2 vTexCoord;


vec3 GetColor(vec2 coord, vec4 circles[numCircles], vec3 colors[numColors], float timeDelay){
  int value = 0;
  vec2 actualCoord = coord;
  float r;
  float xc;
  float yc;
  float d = sqrt((coord[0] - xc)*(coord[0]-xc)+(coord[1]-yc)*(coord[1]-yc));
  xc = circles[0][0];
  yc = circles[0][1];
  r = circles[0][2];
  d = sqrt((coord[0] - xc)*(coord[0]-xc)+(coord[1]-yc)*(coord[1]-yc));
  if(d <= r && iTime >= timeDelay * float(0))
    {
      value += int(circles[0][3]);
    }
    //}
  
    return colors[value-(numColors * (value/numColors))];
}

void main(){
  float timeDelay = 0.05;
  float timeFactor = 50.0;
  vec3 colors[numColors];
  colors[0] = vec3(0.976, 0.254, 0.266);
  colors[1] = vec3(0.952, 0.447, 0.172);
  colors[2] = vec3(0.972, 0.588, 0.117);
  colors[3] = vec3(0.976, 0.517, 0.290);
  colors[4] = vec3(0.976, 0.780, 0.309);
  colors[5] = vec3(0.564, 0.745, 0.427);
  colors[6] = vec3(0.262, 0.666, 0.545); 
  colors[7] = vec3(0.301, 0.564, 0.556);
  colors[8] = vec3(0.341, 0.458, 0.564);
  colors[9] = vec3(0.152, 0.490, 0.631);
    
  float timeInt = 0.0;
  int i = 0;
  float xGap = 1./11.;
  float yGap = 1./11.;
  vec4 circles[numCircles];
  // for(float y = height * yGap; y < height; y+= height * yGap)
  //   {
  //       for (float x = width * xGap; x < width; x += width * xGap)
  //       {
             circles[0] = vec4(width * xGap, height * yGap, iTime * timeFactor - timeFactor * timeDelay * float(0),0+1);
  //           i++;
  //       }
  //   }
  
  circles[0] = vec4(width * xGap, height * yGap, iTime * timeFactor - timeFactor * timeDelay * 0.0,1);
  
  vec3 col = GetColor(gl_FragCoord.xy, circles, colors, timeDelay);
  gl_FragColor = vec4(col,1.0);
}