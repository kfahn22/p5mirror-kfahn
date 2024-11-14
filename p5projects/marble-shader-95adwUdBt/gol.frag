#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D tex;
uniform vec2 normalRes;

void main() {
  vec2 uv = vTexCoord;
  
  uv.y = 1.0 - uv.y;
  
  vec4 col = texture2D(tex, uv);
  float a = col.r;
  
  float num = 0.0;
  for(float i = -1.0; i < 2.0; i++) {
    for(float j = -1.0; j < 2.0; j++) {
      float x = uv.x + i * normalRes.x;
      float y = uv.y + j * normalRes.y;

      num += texture2D(tex, vec2(x, y)).r;
    }
  }
  
  num -= a;
  
  
  
  gl_FragColor = vec4(a, a, a, 1.0);
}