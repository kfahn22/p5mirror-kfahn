// https://preshing.com/20110831/penrose-tiling-explained/
// https://github.com/mdchaney/jsmaze/blob/master/tiling/penrose.html
class Penrose {
  constructor(x0, y0, x1, y1, x2, y2) {
    this.golden = (1 + sqrt(5)) / 2;
    this.a = createVector(x0, y0);
    this.b = createVector(x1, y1);
    this.c = createVector(x2, y2);
    this.result = [];
    this.triangles = [];
      //new colorTriangle(_x0, _y0, _x1, _y1, _x2, _y2, _col);
  }

  //Create wheel of red triangles around the origin
  // https://docs.python.org/3/library/cmath.html
  // cmath.rect(r, phi)
// Return the complex number x with polar coordinates r and phi. Equivalent to r * (math.cos(phi) + math.sin(phi)*1j).
  
subdivide() {
	if (this.color === 0) {
	  let p = this.a.add(this.b.sub(this.a).div(this.golden));
	  this.triangles.push(new colorTriangle(0, this.c, p, this.b));
	  this.triangles.push(new colorTriangle(1, p, this.c, this.a));
	} else if (this.color === 1) {
	    let q = this.b.add(this.a.sub(this.b).div(this.golden));
		let r = this.b.add(this.c.sub(this.b).div(this.golden));
		this.triangles.push(new colorTriangle(1, r, this.c, this.a));
		this.triangles.push(new colorTriangle(1, q, r, this.b));
		this.triangles.push(new colorTriangle(0, r, q, this.a));
	}
}
// wheel() {
//     this.triangles = []
// for (let angle= 0; angle < TWO_PI; angle += TWO_PI/10){
//     let v = new Complex(1, 0);
//     let v2 = new Complex(1, 1);
//     rotate(v, angle);
//     //:= v.mul({abs: 1, arg: angle})
//     // used cmath.rect
//     // TODO: figure out how to do this with complex numbers
//     // let B = rect(1, (2*i - 1) * PI/ 10);
//     // let C = rect(1, (2*i + 1) * PI / 10);
//     if (i % 2 == 0){
//       B, C = C, B  //Make sure to mirror every second triangle
//     triangles.push(new Triangle(0, 0j, B, C))}}
// }


// subdivide(triangles) {
    
//     for (t of this.triangles) {
//       if (color == 0)
//             //Subdivide red triangle
//            {
//              let P = A + (B - A) / goldenRatio
//             result += [(0, C, P, B), (1, P, C, A)]
//            } else 
//             //Subdivide blue triangle
//         { Q = B + (A - B) / goldenRatio
//             R = B + (C - B) / goldenRatio
//             result += [(1, R, C, A), (1, Q, R, B), (0, R, Q, A)]}
//         }
//     return this.result;
// }
}
// Draw red triangles
// show(){
//   for (color, A, B, C in triangles)
//     if (color == 0)
//         cr.move_to(A.real, A.imag)
//         cr.line_to(B.real, B.imag)
//         cr.line_to(C.real, C.imag)
//         cr.close_path()
// cr.set_source_rgb(1.0, 0.35, 0.35)
// cr.fill()    

// //Draw blue triangles
// // for (color, A, B, C in triangles)
// for (t of triangles)
//     {
//       if (color == 1)
//        {
//          cr.move_to(A.real, A.imag)
//          cr.line_to(B.real, B.imag)
//          cr.line_to(C.real, C.imag)
//          cr.close_path()
//          cr.set_source_rgb(0.4, 0.4, 1.0)
//          cr.fill()}
//     }
// }
// //Determine line width from size of first triangle
// color, A, B, C = triangles[0]
// cr.set_line_width(abs(B - A) / 10.0)
// cr.set_line_join(cairo.LINE_JOIN_ROUND)}

// //Draw outlines
// for color, A, B, C in triangles:
//     cr.move_to(C.real, C.imag)
//     cr.line_to(A.real, A.imag)
//     cr.line_to(B.real, B.imag)
// cr.set_source_rgb(0.2, 0.2, 0.2)
// cr.stroke()

