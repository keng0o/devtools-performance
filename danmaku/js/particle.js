const Particle = (function(){

  const color = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

  var Particle = function(x, y){
    this.position = new Vector(x, y);
    this.velocity = Vector.generate(30, 2, 5);
    this.size = 10;
    this.r = Math.floor(256 * Math.random());
    this.g = Math.floor(256 * Math.random());
    this.b = Math.floor(256 * Math.random());
    this.alpha = 208 + Math.floor(48 * Math.random());
  };

  Particle.prototype = {
    get x(){
      return this.position.x;
    },
    get y(){
      return this.position.y;
    },
    set x(value){
      this.position.x = value;
    },
    set y(value){
      this.position.y = value;
    },
    get width(){
      return this.size;
    },
    get height(){
      return this.size;
    },
    get color(){
      return color(this.r, this.g, this.b, this.alpha);
    },
    update: function(app, dt){
      this.updatePosition(app, dt);
      this.render(app.context);
    },
    render: function(gl){
      gl.fillStyle = this.color;
      gl.fillRect(this.x, this.y,
                  this.width, this.height);
    },
    updatePosition: function(app, dt){
      this.position = this.position.add$(this.velocity);
    }
  };

  return Particle;
})();
