const ParticleList = (function(){
  const Naive = function(){
    this.initialize.apply(this, arguments);
  };
  Naive.prototype = {
    initialize: function(){
      this.list = [];
    },
    forEach: function(f){
      this.list.forEach(f);
    },
    add: function(x, y){
      this.list.push(new Particle(x, y));
    },
    update: function(app, dt){
      this.forEach(particle => {
        particle.update(app);
      });
    },
    get length(){
      return this.list.length;
    }
  };

  return Naive;
})();
