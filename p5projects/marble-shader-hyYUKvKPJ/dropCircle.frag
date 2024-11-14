// Fragment shader for adding drops

// Precision
precision highp float;

// Uniforms
uniform vec2 u_resolution;  // Canvas resolution
uniform float u_count;       // Number of drops
uniform int u_interpolation; // Interpolation flag (0 for nearest, 1 for bilinear)
uniform vec4 u_color;        // Drop color (you can also pass color as uniform)


// Varyings
varying vec2 vTexCoord;

#define TEAL vec3(80,133,139)/255.
#define dropRadius 0.5

vec3 DropPaint(vec2 uv) {
    vec3 col = vec3(0.);

    // Make boxes with (0,0) in middle
    vec2 gv = fract(uv) - 0.5;
    
    // Add Drops
    // Add id for boxes
    vec2 id = floor(uv);
    
    // Iterate through neighborhood of box to add contribution from neighbors
    for (int  y =-1; y <= 1; y++) {
        for (int x=-1; x <= 1; x++) {
            vec2 offset = vec2(x,y);
            // Calculate drop center position
            vec2 dropCenter = id + offset;
            // Calculate the distance between the current fragment and the drop center
            vec2 delta = uv - dropCenter;
            float distance = length(delta);
            // Check if the fragment is within the radius of the drop
            if (distance < dropRadius) {
                // Apply drop effect based on the formula: C + (P - C) * sqrt(1 + r^2 / length(P - C)^2)
                vec2 paintDrop = dropCenter + (uv - dropCenter) * sqrt(1.0 + pow(dropRadius, 2.0) / pow(distance, 2.0));
                // Add paint drop color to the final color
                col += mix(TEAL, col, smoothstep(0.0, 1.0, length(uv - paintDrop)));
            }
        }
    }
    return col;
}


void main() {
    // Calculate the coordinate of the current fragment in UV space
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Calculate the color of the fragment using the StarLayer function
    vec3 color = DropPaint(uv);

    // Output the final color of the fragment
    gl_FragColor = vec4(color, 1.0);
}
