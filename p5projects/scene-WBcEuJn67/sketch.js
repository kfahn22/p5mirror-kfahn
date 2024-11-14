function Intro()
{
    this.setup = function() {
      createCanvas(400, 400);
    }

    this.draw = function() {
      background(220);

    } 
    this.mousePressed = function() {
      this.sceneManager.showScene( Shader )
   };
}

function Shader()
{
  this.setup = function() {
    
  }
  this.draw = function() {
    
  }
}