// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// https://www.shadertoy.com/view/MsXGz8
vec2 doit( in vec2 p, in float off, float amp )
{
    float f = 0.0;
	float a = 0.0;
    for( int i=0; i<10; i++ )
    {
  	    float h = float(i)/10.0;
  	    float g = texture( iChannel1, vec2(0.01+h*0.5, 0.25)).x;
  	    float k = 1.0 + 0.4*g*g;

        vec2 q;
        q.x = sin(iTime*0.015+0.67*g*(1.0+amp) + off + float(i)*121.45) * 0.5 + 0.5;
        q.y = cos(iTime*0.016+0.63*g*(1.0+amp) + off + float(i)*134.76) * 0.5 + 0.5;
	    vec2 d = p - q;
		float at = 1.0/(0.01+dot(d,d));
        f += k*0.1*at;
		a += 0.5 + 0.5*sin(2.0*atan(d.y,d.x));//*at;
    }
	
    return vec2(f,a);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = fragCoord.xy / iResolution.xy;

	float isTripy = smoothstep( 86.5, 87.5, iChannelTime[1] ) - 
		            smoothstep( 100.5, 108.0, iChannelTime[1] );

    vec2 ref = doit( p, 0.0, isTripy );
    float b = ref.x;	

	
    vec3 col = texture( iChannel0,vec2(pow(0.25*ref.x,0.25), 0.5)).xyz
             * texture( iChannel0,vec2(0.1*pow(ref.y,1.2), 0.6)).xyz;
	col = sqrt(col)*2.0;
	
	vec3 col2 = col;
	col2 = 4.0*col2*(1.0-col2);
	col2 = 4.0*col2*(1.0-col2);
	col2 = 4.0*col2*(1.0-col2);
    
	col = mix( col, col2, isTripy );

	float useLights = 0.5 + 1.5*smoothstep( 45.0, 45.2, iChannelTime[1] );
	col += useLights*0.5*pow( b*0.1, 4.0 ) * pow( texture( iChannel1, vec2(0.1,0.25) ).x, 2.0 );

	fragColor = vec4( col, 1.0 );;
}
