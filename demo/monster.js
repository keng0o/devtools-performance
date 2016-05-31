const Monster = (function(){

  const Klass = function(){
    this.initialize.apply(this, arguments);
  };

  Klass.prototype = {
    initialize: function(name, rarelity,
                         life, attack, defence,
                         image){
      this.name = name;
      this.reality = rarelity;
      this.life = life;
      this.attack = attack;
      this.defence = defence;
      this.image = image;
    }
  };

  return Klass;

})();
