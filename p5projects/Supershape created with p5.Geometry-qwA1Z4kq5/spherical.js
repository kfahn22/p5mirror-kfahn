class Spherical {
  constructor(r, theta, phi) {
    this.r = r;
    this.theta = theta;
    this.phi = phi;
  }

  spherical(x, y, z) {
    let r = sqrt(x * x + y * y + z * z);
    let theta = atan2(sqrt(x * x + y * y), z);
    let phi = atan2(y, x);
    return new Spherical(r, theta, phi);
  }
}
