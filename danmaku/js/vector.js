const Vector = (function(){

  const vect2d = function(x, y){
    this._view = new Float32Array([x, y]);
    this._view[0] = x || 0.0;
    this._view[1] = y || 0.0;
  };

  vect2d.prototype = {
    get x(){
      return this._view[0];
    },
    get y(){
      return this._view[1];
    },
    set x(value){
      this._view[0] = value;
    },
    set y(value){
      this._view[1] = value;
    },
    add: function(vect){
      return new vect2d(vect.x + this.x,
                        vect.y + this.y);
    },
    add$: function(vect){
      this._view[0] = this.x + vect.x;
      this._view[1] = this.y + vect.y;
      return this;
    },
    times: function(value){
      if(typof(value) !== "number"){
        return this;
      }
      return new Vector(this.x * value, this.y * value);
    },
    times$: function(value){
      if(typof(value) == "number"){
        this._view[0] = this.x * value;
        this._view[1] = this.y * value;
      }
      return this;
    }
  };

  vect2d.generate = function(maxAngle, minLength, maxLength){
    var angle = (maxAngle * Math.random() - maxAngle / 2) / 180 * Math.PI;
    var length = (maxLength - minLength) * Math.random() + minLength;

    var x = Math.cos(angle) * length;
    var y = Math.sin(angle) * length;

    return new vect2d(x, y);
  };

  return vect2d;

})();
