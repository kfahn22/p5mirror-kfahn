// http://roy.red/posts/uniting-spherical-and-hyperbolic-tilings/

// This is code is 'live'; adjust 'space'
float y = 0.;
float space = -1.; // try 0.0 or 1.0
float dot_(vec3 a, vec3 b) { 
    // Perform either dot product
    return a.x*b.x+a.y*b.y+space*a.z*b.z;
}
vec3 color(vec2 z) {
    // Draw the xz-plane
    vec3 z3 = 2.*vec3(z.x,y,z.y); 
    z3 = z3.zyx; // flip
    return vec3(dot_(z3,z3)<0.9 ||
                dot_(z3,z3)>1.1);
}

// float space = -1.;
// vec2 p = vec2(-0.460,-0.130);
// // Calculate the length-squared of vector
// float len2(vec2 a) {
//     return a.x*a.x + space*a.y*a.y;
// }
// vec3 color(vec2 a) {
//     a *= 2.; vec3 c = vec3(1);
//     // Normalize so len(p)=1
//     p /= sqrt(len2(p));
//     // Reflect the world
//     a = a - 2.*dot(a,p)*p*vec2(1,space);
//     // Draw the cutting plane
//     c.rg = vec2(abs(dot(a,p))>.05);
//     // Draw the plane normal vector
//     c.rb -= float(abs(dot(a,vec2(-p.y,p.x)))<.03 
//             && dot(a,p)<0. && dot(a,a)<.2);
//     // Draw the surface
//     c -= vec3(abs(len2(a.yx)-1.)<0.1)
//     // Draw the red region
//         *vec3(1.-(1.-abs(a.x))*float(a.y>0.),1,1);
//     return c;
//  }