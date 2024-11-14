// Ported to P5.js from [SH16B] Flight - By David Hoskins for July comp week two 2016.
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// *NB -  If you resize the window or go full screen, you must left-click it to reset the buffers.

//#define SHOW_MAP 

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep
#define T iTime

// Color scheme
#define PURPLE vec3(83,29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162,100) / 255.
#define GREEN vec3(111,208,140) / 255.
#define BLUE vec3(118, 212,229) / 255.

#define PI = 3.14159
#define B backgroundGradient

vec3 backgroundGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

vec3 gradient(vec3 rd, vec3 col1, vec3 col2, float m) {
  float k = rd.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


float SmoothNoise(vec2 uv) {
   // lv goes from 0,1 inside each grid
   // check out interpolation for dummies
    vec2 lv = fract(uv);
   
   //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
    vec2 id = floor(uv); // find id of each of the boxes
     lv = lv*lv*(3.-2.*lv); 
    
    // get noise values for each of the corners
    // Use mix function to join together
    float bl = N21(id);
    float br = N21(id+vec2(1,0));
    float b = mix (bl, br, lv.x);
    
    
    float tl = N21(id + vec2(0,1));
    float tr = N21(id+vec2(1,1));
    float t = mix (tl, tr, lv.x);
    
    return mix(b, t, lv.y);
}

float SmoothNoise2 (vec2 uv) {
   float c = SmoothNoise(uv*4.);
     // Layer(or octave) of noise
    // Double frequency of noise; half the amplitude
    c += SmoothNoise(uv*8.)*.5;
    c += SmoothNoise(uv*16.)*.25;
    c += SmoothNoise(uv*32.)*.125;
    c += SmoothNoise(uv*64.)*.0625;
    
    return c/ 2.;  // have to normalize or could go past 1
  
}
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

float GetDist(vec3 p) {
    float d = sdBox(p, vec3(1));
    
    return d;
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),  // forward vector
        r = normalize(cross(vec3(0,1,0), f)),  // right vector
        u = cross(f,r),  // up vector 
        c = f*z,  // center of "virtual screen"
        i = c + uv.x*r + uv.y*u,  //intersection point camera ray and virtual screen
        d = normalize(i);
    return d;
}



vec3 sunLight  = normalize( vec3(  -0.35, 0.2,  0.3 ) );
const vec3 sunColour = vec3(1.0, .95, .85);
vec2 coord;
float specular = .2;


//--------------------------------------------------------------------------

#define SCALE  .00005
#define HEIGHT 1400.0
float pixelY;

vec2 fracSkip(vec2 p)
{
    p = fract(p);
    if (p.y < pixelY) p.y = pixelY;
    return p;
}
    
float terrain( in vec2 p)
{
	p *= SCALE;

	return texture2D( tex0, fracSkip(p), 0.0).w*HEIGHT;
}

//--------------------------------------------------------------------------
vec3 terColour( in vec2 p)
{
	p *= SCALE;

	vec3 n = texture2D( tex0, fracSkip(p), 0.0).xyz;
    return n;
}

//--------------------------------------------------------------------------
float terrainD( in vec2 p, float r)
{
	p *= SCALE;
    r = r * r*.01;
    
	float n = texture2D( tex0, fracSkip(p), 0.0).w;
    if (n > 0.0)
    {
    	n += smoothstep(.0, 1.,texture2D( tex0, fract(p*20.0), r).x)*.01;
        n += smoothstep(.0, 1.,texture2D( tex0, fract(p*2.0), r).x)*.1;
    }
    else
    {
    	n -= texture2D( tex0, fract(p*13.0)+iTime*.05, r*.25).x*.002-
             texture2D( tex0, fract(p*30.0)-+iTime*.05, r*.25).x*.001;
    }
    return n * HEIGHT;
}

//--------------------------------------------------------------------------
float Map(in vec3 p)
{
	float h = terrain(p.xz); 
    return p.y - h;
}

//--------------------------------------------------------------------------
vec3 getSky(in vec3 rd, bool obs)
{
	float sunAmount = max( dot( rd, sunLight), 0.0 );
	float v = pow(1.0-max(rd.y,0.0),4.);
	vec3  sky = mix(vec3(.07, 0.14,.2), vec3(.4, .4, .4), v);
	sky = sky + sunColour * sunAmount * sunAmount * .15;
	if (!obs)sky = sky + sunColour * min(pow(sunAmount, 500.0), .6);
	return clamp(sky, 0.0, 1.0);
}

//--------------------------------------------------------------------------
float sphereRadius(float t)
{
	t = abs(t);
	t *= 0.001;
	return clamp(t*t, 1000.0/u_resolution.y, 3000.0);
}

//--------------------------------------------------------------------------
vec3 getNormal(vec3 p, float sphereR)
{
	vec2 j = vec2(sphereR, 0.0);
	vec3 nor  	= vec3(0.0,		terrainD(p.xz, sphereR), 0.0);
	vec3 v2		= nor-vec3(j.x,	terrainD(p.xz+j, sphereR), 0.0);
	vec3 v3		= nor-vec3(0.0,	terrainD(p.xz-j.yx, sphereR), -j.x);
	nor = cross(v2, v3);
	return normalize(nor);
}

//--------------------------------------------------------------------------
float noise( in vec3 x )
{
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = texture2D( tex0, (uv+ 0.5)/256.0, 0.0).yx;
	return mix( rg.x, rg.y, f.z );
}

//--------------------------------------------------------------------------
float FBM( vec3 p )
{
    p.y *= 3.;
    float f;
	f  = 0.5000	 * noise(p); p = p * 2.6; //p.y -= gTime*.2;
	f += 0.2500	 * noise(p); p = p * 2.5; //p.y += gTime*.06;
	f += 0.1250	 * noise(p); p = p * 2.4;
    f += 0.0625	 * noise(p); p = p * 2.7;
    f += 0.03125 * noise(p);
    return f;
}
//--------------------------------------------------------------------------
float mapClouds(vec3 p)
{
    float h = FBM(p*.0001);
	return clamp(h-.64, 0.0, 1.0) * smoothstep(40000.0, 2500.0,p.y) * smoothstep(250.0, 2500.0,p.y);
}
//--------------------------------------------------------------------------
float FBM(in vec2 xy)
{
	float w = .5;
	float f = 0.0;
    xy*= vec2(.0003,.0002) ;

	for (int i = 0; i < 5; i++)
	{
		f += texture2D(tex0, xy, 0.0).z * w;
		w = w*0.5;
		xy = 2.3 * xy;
	}
	return pow(max(f-.35, 0.0), 2.0)*3.;
}
vec3 getCirrusClouds(in vec3 camPos, in vec3 sky, in vec3 rd)
{
    rd.y = max(rd.y,0.0);
	// Uses the ray's y component for horizon fade of fixed colour clouds...
	float v = (40000.0-camPos.y)/rd.y;
	rd.xz = (rd.xz * v + camPos.xz+vec2(300.0,-3830.0)) * 0.002;
	float f = (FBM(rd.xz));
	vec3 cloud = mix(sunColour, vec3(1.), min(f*2.2, 1.0));
	sky = mix(sky, cloud, clamp(f*rd.y*rd.y, 0.0, .4));
	return sky;
}
vec4 scene(in float rand, in vec3 rO, in vec3 rD, out vec3 colour, out float dis, out vec2 cloud)
{
	float t = Map(rO)*.5*rand;
    dis = 0.0;
	float alpha;
    colour = vec3(0);
	vec4 normal = vec4(0.0);
	vec3 p = vec3(0.0);
     vec2 shade = cloud = vec2(0.0, 0.0);
	for( int j=0; j < 200; j++ )
	{
		if (normal.w > 1.) break;
		p = rO + t*rD;
		float sphereR = sphereRadius(t);
		float h = Map(p);
        
		if( h <= sphereR)
		{
			// Accumulate...
			vec3 nor = getNormal(p, sphereR);
			alpha = (1.0 - normal.w) * ((sphereR-h) / sphereR);
			normal += vec4(nor * alpha, alpha);
            colour += terColour(p.xz)*alpha;
            if (dis == 0.0)dis = t;
		}
		t +=  h*.4 + t * .003;
	}
    
	normal.xyz = normalize(normal.xyz);
	// Scale the alpha up to 1.0...
	normal.w = clamp(normal.w, 0.0, 1.0);
    
    if (p.y <= sphereRadius(t)) specular += .5;
    
    float t2 =.0;
    for(int j=0; j < 120; j++)
	{
        if (t2 > t ||cloud.y >= 1.0) break;
        p = rO + t2*rD;
   		shade.y = mapClouds(p)*.2;
		shade.x = mapClouds(p) - mapClouds(p+sunLight*300.);
        cloud += shade * (1. - cloud.y);
        t2 += 220.0 + t2*.004;
    }
    cloud.x += .5;
    cloud *= .85;
    
	return normal;
}

//--------------------------------------------------------------------------
vec3 post(vec3 rgb, vec2 xy)
{
	// Gamma first...
	rgb = pow(rgb, vec3(0.45));

	// Then...
	#define CONTRAST 1.9
	#define SATURATION 1.8
	#define BRIGHTNESS 1.04
	rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb*BRIGHTNESS)), rgb*BRIGHTNESS, SATURATION), CONTRAST);
	// Noise...
	// rgb = clamp(rgb+Hash(xy*iTime)*.1, 0.0, 1.0);
	// Vignette...
	rgb *= .5+0.5*pow(20.0*xy.x*xy.y*(1.0-xy.x)*(1.0-xy.y), 0.2 );	

	return rgb;
}

//--------------------------------------------------------------------------
vec3 doLighting(in vec3 mat, in vec3 normal, in vec3 eyeDir)
{
	float h = dot(sunLight,normal);
	mat = mat * sunColour*(max(h, 0.0));
    mat += vec3(.05, .07,.07) * max(normal.y*.5, 0.0);

    vec3 ref = reflect(eyeDir, normal);
    mat += specular * pow(max(dot(ref, sunLight),0.0), 10.0)*.7;
	return mat;
}

//--------------------------------------------------------------------------

vec3 spline(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t){

    return ((-p0 + p1*3. - p2*3. + p3)*t*t*t +
            (p0*2. - p1*5. + p2*4. - p3)*t*t +
            (-p0 + p2)*t + p1*2.)*.5;
}

//--------------------------------------------------------------------------
vec3 getCamTex(float t)
{
    t = mod(t, u_resolution.x);
    vec3 r= texture2D(tex0,vec2(.5,.5)).rgb;
   // vec3 r = texture2D(tex0, ivec2(t, 0.)).rgb;
    r *= 1000.0;
	return r;
}

//--------------------------------------------------------------------------
vec3 getCameraPos(float ti)  
{
    float t = floor(ti);
    float f = fract(ti);
	vec3 cam = spline(getCamTex(t), getCamTex(t+1.0), getCamTex(t+2.0), getCamTex(t+3.0), f);
    
    return cam;
}

//--------------------------------------------------------------------------
void main()
{
    float time =iTime-55.;
    float speed  = cos(time*.1)*4.;
	float gTime = (iTime*.5)+speed;
    speed = (min(cos(time*.1+.2), 0.0)-speed) * .3;
    vec2 xy = gl_FragCoord.xy / u_resolution.xy;

	// Show map for testing...
    #ifdef SHOW_MAP
    fragColor = fract(texture2D(tex0, xy));return;
    #endif

	vec2 uv = (-1.0 + 2.0 * xy) * vec2(u_resolution.x/u_resolution.y,1.0);
    coord = gl_FragCoord.xy / u_resolution.xy;
 
	vec3 cameraPos = getCameraPos(gTime);
    vec3 camTarget = getCameraPos(gTime+.02);
    float t = mod(iTime+12., 40.0);
    float f = (smoothstep(.0, 3., t) * smoothstep(10.0, 7., t))*100.;
    camTarget.y -= f;
    f = (smoothstep(25.0, 30., t) * smoothstep(35.0, 30., t))*2300.;
    camTarget.z += f;

    
	float roll = .4*sin(gTime*.3);
	vec3 cw = normalize(camTarget-cameraPos);
	vec3 cp = vec3(sin(roll), cos(roll),0.0);
	vec3 cu = cross(cw,cp);
	vec3 cv = cross(cu,cw);
    vec3 dir = normalize(uv.x*cu + uv.y*cv + (1.5-speed+-dot(xy-.5, xy-.5))*cw);
	mat3 camMat = mat3(cu, cv, cw);
    pixelY = 1.5/u_resolution.y;

	vec3 col;
	float dist;
	vec4 normal;
    vec2 clouds;
    bool obscureSun = true;
	normal = scene(texture2D(tex0,(xy*iTime), 0.0).x,cameraPos, dir, col, dist, clouds);
	col = doLighting(col, normal.xyz, dir);
    
    
	t = dot(dir, sunLight);
    if (normal.w < .3) obscureSun = false;
    vec3 sky = getSky(dir, obscureSun);
    col = mix(sky, col, exp(-dist*.00003));
	col = mix(sky, col, normal.w);
    
    if (normal.w < .2)col = getCirrusClouds(cameraPos, col, dir);

   	float bri = max(dot(cw, sunLight)*.7, 0.);
    
    col = mix(col, vec3(clouds.x)*sunColour+bri*.4, clouds.y);

	if (bri > 0.0)
	{
		vec2 sunPos = vec2( dot( sunLight, cu ), dot( sunLight, cv ) );
		vec2 uvT = uv-sunPos*.5;
		uvT = uvT*(length(uvT));
		bri = pow(bri, 6.0)*.4;

		float glare1 = max(dot(normalize(vec3(dir.x, dir.y+.3, dir.z)),sunLight),0.0)*1.4;
		float glare2 = max(1.0-length(uvT*2.5+sunPos*2. )*.6, 0.0);
		uvT = mix (uvT, uv, -4.3);
		float glare3 = max(1.0-length(uvT*.5+sunPos*3.0)*.8, 0.0);

		col += bri * vec3(1., 0.5, .2)  * pow(glare1, 12.5)*.1;
		col += bri * vec3(1.0, .2, 0.) * pow(glare2, 6.8)*20.;
		col += bri * sunColour * pow(glare3, 4.0)*15.0;
	}
	col = post(col, xy);	
	
	
	gl_FragColor=vec4(col,1.0) * smoothstep(0.0, 3., iTime);
}

//--------------------------------------------------------------------------