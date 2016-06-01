const App = (function(){

  var App = function(){
    this.initialize.apply(this, arguments);
  };

  var N = 20;

  const clear = (canvas, color) => gl => {
    gl.fillStyle = color;
    gl.fillRect(0, 0, canvas.width, canvas.height);
  };

  App.prototype = {
    initialize: function(canvas){
      this._el = canvas;
      this.clear = clear(canvas, "rgba(51, 51, 51, .4)");
      this.latest = null;
      this.lastUpdate = 0;
      this.el.addEventListener("mousedown", event =>{
        this.latest = event;
      });
      this.el.addEventListener("mouseup", event =>{
        this.latest = null;
      });
      this.el.addEventListener("mousemove", event => {
        if(this.latest){
          this.latest = event;
        }
      });

      this.particles = new ParticleList(canvas.width, canvas.height);
    },
    get context(){
      if(this._context == null){
        this._context = this.el.getContext("2d");
      }
      return this._context;
    },
    get el(){
      return this._el;
    },
    get width(){
      return this.el.width;
    },
    get height(){
      return this.el.height;
    },
    start: function(){
      this.update();
    },
    update: function(timestamp){
      const dt = Math.max(1, (timestamp - this.lastUpdate) / 16.66);
      this.lastUpdate = timestamp;
      if(this.latest){
        this.addParticleFromEvent(this.latest);
      }
      const context = this.context;
      this.clear(context);
      // const fib = this.fibonacci(35);
      this.particles.update(this, dt);
      window.requestAnimationFrame(timestamp => this.update(timestamp));
    },
    fibonacci(n){
      if(n <= 1){
        return 1;
      }
      return this.fibonacci(n-1) + this.fibonacci(n-2);
    },
    addParticle: function(x, y){
      this.particles.add(x, y);
    },
    addParticleFromEvent: function(event){
      for(var i = 0; i < N; i++){
        this.addParticle(event.clientX,
                         event.clientY);
      }
    }
  };

  return App;

})();
