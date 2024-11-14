// for (let j = 0; j < detail + 1; j++) {
//         let lon = map(j, 1, detail, 0, TWO_PI);
//         let ry = map(cos(lon), -1, 1, 0.5 * r, 0.75 * r);
//         let x = r * sin(lat) * cos(lon);
//         let y = ry * sin(lat) * sin(lon);
//         let z = 0.1 * r * cos(2 * lat + 0) + pow(r, 0.5) * pow(cos(lat), 4);
//         this.vertices.push(new p5.Vector(x, y, z));
//       }