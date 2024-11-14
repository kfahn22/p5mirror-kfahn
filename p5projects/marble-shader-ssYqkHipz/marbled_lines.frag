// Adapted from here
// https://www.shadertoy.com/view/ltcSzn
// Another version
// https://www.shadertoy.com/view/ttV3Dd

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float u_time;
uniform float iFrame;
uniform float uNoiseTexture;

#define TAU 2.*acos(-1.)

#define PURPLE vec3(112, 50, 126) / 255.
#define GREEN vec3(102, 211, 52) / 255.
#define YELLOW vec3(252, 238, 33) / 255.
#define ORANGE vec3(248, 158, 79) / 255.
#define RASPBERRY vec3(236, 1, 90) / 255.


float contain( float v ) {    
	return (v + 1.) / 2.; 
}

float verticalBars( vec2 uv, float num ) {
    float v = sin(num * TAU * uv.x);
    return smoothstep(0.45, 0.55, (v + 1.) / 2.);
    
}

float horizontalBars( vec2 uv, float num ) {
    float v = sin(num * TAU * uv.y);
    return smoothstep(0.45, 0.55, (v + 1.) / 2.);
    
}

float rand(float i) {
 return fract(sin(i)*1000000.0);   
}

float noise( float x ) {
    float i = floor(x);
	float f = fract(x);
	return mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));   
}

void main()
{
    float bars = 5.;
    
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    float t = sin(u_time* 0.1);
    uv += vec2( 0.0, 0.02 * abs(sin(30. * TAU * uv.x)) + 0.1 * sin( t +  2. * TAU * uv.x) + noise(uv.x * 200.0)* 0.01);
    
    float a = horizontalBars( uv, 7. );
    float b = horizontalBars( uv, 11. );
    float c = horizontalBars( uv, 17. );
    
    
    vec3 col = vec3( a-c, (b-c) * 0.8, c * 0.7 );
    
	gl_FragColor = vec4(col,1.0);
}

