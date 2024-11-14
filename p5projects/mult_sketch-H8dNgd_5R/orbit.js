/**
 * Orbits [Instance Mode] (v1.0)
 * AllOneString & GoToLoop (2016-Jun-29)
 *
 * https://forum.Processing.org/two/discussion/17306/multiple-canvases-on-one-page
 *
 * http://CodePen.io/anon/pen/RRpJGm?editors=0010
 * http://p5ide.HerokuApp.com/editor#?sketch=577369489e3f9603000ab5c6
*/

new p5(p => {
  "use strict";

  const ORBS = Uint8Array.of(0, 80, 35), bodies = Array(ORBS.length);
  let bg;

  p.setup = () => {
    p.createCanvas(250, 250);
    p.stroke(0).strokeWeight(2.5);
    bg = p.color(p.random(0xd0, 0x100), p.random(0xd0, 0x100), p.random(0xd0, 0x100));
    for (let i = 0; i < ORBS.length; ++i)
      bodies[i] = new Body(p, ORBS[i], i*.01, Body.BASE_RAD - i*10);
  };

  p.draw = () => {
    p.background(bg).translate(p.width>>1, p.height>>1);
    for (let b of bodies)  b.display(), b.update();
  };

  p.mousePressed = () => {
    bg = p.color(p.random(0xd0, 0o400), p.random(0xd0, 0o400), p.random(0xd0, 0o400));
    for (let b of bodies)  b.initBody();
  };
});
