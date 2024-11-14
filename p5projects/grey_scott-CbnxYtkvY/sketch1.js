let fbo

function setup() {
  createCanvas(400, 400, WEBGL)
  fbo = createFramebuffer()
}

function draw() {
  // Draw a box to the Framebuffer
  fbo.draw(() => {
    clear()
    push()
    noStroke()
    fill(255, 0, 0)
    rotateX(frameCount * 0.01)
    rotateY(frameCount * 0.01)
    box(150)
    pop()
  })

  // Do something with fbo.color or dbo.depth
  texture(fbo.depth)
  noStroke()
  plane(width, height)
}