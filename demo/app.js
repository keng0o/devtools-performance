const App = (function(){

  function App(settings){
    this.images = settings.images;
    this.list = new MonsterList();
    this.container = settings.container ||
      document.querySelector("body");
    this.templates = settings.template;
    this.views = {
      control: new Control(this, this.templates.control),
      counter: new Counter(this.list, this.templates.counter)
    };
    this.render();
  }

  App.prototype = {
    add: function(n){
      n = n || 1;
      while(n-- > 0){
        this.list.add(MonsterFactory.create());
      }
      this.update();
      return this;
    },
    render: function(){
      this.container.appendChild(this.views.control.render());
      this.container.appendChild(this.views.counter.render());
    },
    decorate: function(){
      this.list.forEach(this.decorator);
      this.decorator(Monster);
    },
    clear: function(){
      this.list.clear();
      this.update();
    },
    update: function(){
      this.views.counter.update();
    }
  };

  function images(url){
    url = url || "images/all.json";
    return fetch(url)
      .then(response => response.json());
  }

  return {
    start: function(settings){
      return images(settings.images).then(list => {
        settings.images = list;
        return new App(settings);
      });
    }
  };
})();
