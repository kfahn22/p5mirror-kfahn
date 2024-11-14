// This is a shadertoy example (www.shadertoy.com) which will visualize the 4-colours palette


vec3 color_from_height( const float height )
{
    vec3 terrain_colours[4];
    terrain_colours[0] = vec3(0.0,0.0,0.6);
    terrain_colours[1] = vec3(0.1, 0.3, 0.1);
    terrain_colours[2] =  vec3(0.4, 0.8, 0.4);
    terrain_colours[3] = vec3(1.0,1.0,1.0);
    //vec3 terrain_colours[1] = vec3[1]{ vec3(0,0,0.6)};
    if(height < 0.0)
        return terrain_colours[0];
    else
    {
        float hscaled = height*2.0 - 1e-05; // hscaled should range in [0,2)
        int hi = int(hscaled); // hi should range in [0,1]
        float hfrac = hscaled-float(hi); // hfrac should range in [0,1]
        if( hi == 0)
            return mix( terrain_colours[1],terrain_colours[2],hfrac); // blends between the two colours    
        else
            return mix( terrain_colours[2],terrain_colours[3],hfrac); // blends between the two colours
    }
    return vec3(0.0,0.0,0.0);
}

void main(void)
{
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec3 col = color_from_height(uv.y*2.0-1.0);
    gl_FragColor = vec4(col,1.0);
}