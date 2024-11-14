
	precision highp float;

	uniform vec2 u_resolution;
	uniform vec2 u_mouse;
	uniform float u_time;
	uniform vec3 u_lightDir;
	uniform vec3 u_col;
	uniform mat3 uNormalMatrix;
	uniform float u_pixelDensity;
	uniform sampler2D u_tex;

	//attributes, in
	varying vec4 var_centerGlPosition;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

    // functions
	float rand(vec2 c){
		return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}

	mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
	}

	mat2 scale2d(vec2 _scale){
			return mat2(_scale.x,0.0,
									0.0,_scale.y);
	}

	vec2 tile (vec2 _st, float _zoom) {
			_st *= _zoom;
			return fract(_st);
	}

	//	Classic Perlin 3D Noise 
	//	by Stefan Gustavson

	vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
	vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
	vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

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

	float cnoise(vec3 P){
		vec3 Pi0 = floor(P); // Integer part for indexing
		vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
		Pi0 = mod(Pi0, 289.0);
		Pi1 = mod(Pi1, 289.0);
		vec3 Pf0 = fract(P); // Fractional part for interpolation
		vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
		vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
		vec4 iy = vec4(Pi0.yy, Pi1.yy);
		vec4 iz0 = Pi0.zzzz;
		vec4 iz1 = Pi1.zzzz;

		vec4 ixy = permute(permute(ix) + iy);
		vec4 ixy0 = permute(ixy + iz0);
		vec4 ixy1 = permute(ixy + iz1);

		vec4 gx0 = ixy0 / 7.0;
		vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
		gx0 = fract(gx0);
		vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
		vec4 sz0 = step(gz0, vec4(0.0));
		gx0 -= sz0 * (step(0.0, gx0) - 0.5);
		gy0 -= sz0 * (step(0.0, gy0) - 0.5);

		vec4 gx1 = ixy1 / 7.0;
		vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
		gx1 = fract(gx1);
		vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
		vec4 sz1 = step(gz1, vec4(0.0));
		gx1 -= sz1 * (step(0.0, gx1) - 0.5);
		gy1 -= sz1 * (step(0.0, gy1) - 0.5);

		vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
		vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
		vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
		vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
		vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
		vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
		vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
		vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

		vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
		g000 *= norm0.x;
		g010 *= norm0.y;
		g100 *= norm0.z;
		g110 *= norm0.w;
		vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
		g001 *= norm1.x;
		g011 *= norm1.y;
		g101 *= norm1.z;
		g111 *= norm1.w;

		float n000 = dot(g000, Pf0);
		float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
		float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
		float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
		float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
		float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
		float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
		float n111 = dot(g111, Pf1);

		vec3 fade_xyz = fade(Pf0);
		vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
		vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
		float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
		return 2.2 * n_xyz;
	}

	vec2 random2( vec2 p ) {
			return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
	}

	void main(){
        //vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
		vec2 st = var_vertTexCoord.xy / u_resolution.xy;
		st*=1.0;
		
		st.y*=u_resolution.y/u_resolution.x;
		
		vec2 st0 = st;
		vec2 stStroke =st;
		
      // original code
// 		st0.y-=cnoise(vec3(st0*${Math.random()*300+250},0.))/${Math.random()*10+50};
// 		st0.x+=cnoise(vec3(st0*500.,u_time/300.))/${Math.random()*10+50};
// 		st0.y-=cnoise(vec3(st0*${Math.random()*100+250},0.))/${Math.random()*10+50}; 
		
// 		stStroke.y+=cnoise(vec3(stStroke*1000.,u_time/500.))/${Math.random()*150+100};
	
		
// 		vec4 texColorStroke = texture2D(u_tex,stStroke);
// 		vec4 texColor0 = texture2D(u_tex,st0);

// 		st.y+=cnoise(vec3(st*20.,u_time/100.))/${Math.random()*100+100};
      
      // Attempt to substitute for ${Math.random()
        float mr = SmoothNoise2(st);
        st0.y-=cnoise( vec3( ( st0*(mr*300.0+250.0 ), 0.0) / (mr*10.0+50.0) ) );
		st0.x+=cnoise( vec3( ( st0*500.0,u_time/300.0 ) / (mr*10.0+50.0) ) ); 
		st0.y-=cnoise( vec3( ( st0*(mr*100.0+250.0), 0.0) / (mr*10.0+50.0) ) ); 
		
		stStroke.y+=cnoise( vec3( (stStroke*1000., u_time/500.0) / (mr*150.0+100.0) ) );
	
		
		vec4 texColorStroke = texture2D(u_tex,stStroke);
		vec4 texColor0 = texture2D(u_tex,st0);

		st.y+=cnoise( vec3(  (st*20.0,u_time/100.) / (mr*100.0+100.0) ) );
		st.y+=cnoise(vec3(st*50.0,u_time/10.))/90.;
		st.x+=cnoise(vec3(st*50.0,u_time/10.))/90.;
		
		
		vec4 texColor1 = texture2D(u_tex,st);
		texColor1 +=texColor0;
		texColor1+=texColorStroke/2.;
		
		texColor1.r-=texColor1.b/10.; 
		
		 
		texColor1*=1.2; 
        //texColor1*=1.0; 
		gl_FragColor= vec4(texColor1.rgb,1.0);
	}





