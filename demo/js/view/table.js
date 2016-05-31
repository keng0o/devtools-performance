const Table = Klass.define(function(){
  const doRender = function(list, template, maxItems){
    const rendered = [];
    const toRender = Math.min(maxItems, list.length);
    const root = document.createDocumentFragment();
    while(rendered.length < toRender){
      let index = Util.randomInt(0, list.length);
      if(!rendered.includes(index)){
        let tr = new Row(list.getMonsterAt(index), template);
        let el = tr.render();
        root.appendChild(el);
        rendered.push(index);
      }
    }
    return root;
  };

  return {
    initialize: function(settings){
      this.template = settings.template;
      this.rowTemplate =settings.rowTemplate;
      this.maxItems = settings.maxItems || 100;
      this.el = document.importNode(this.template.content, true);
      this.table = this.el.querySelector("table");
      this.model = settings.model;
      this.body = this.el.querySelector("tbody");
    },
    render: function(){
      this.update();
      return this.el;
    },
    update: function(){
      if(this.body){
        this.table.removeChild(this.body);
      }
      this.body = document.createElement("tbody");
      this.table.appendChild(this.body);
      const cells =
              doRender(this.model, this.rowTemplate, this.maxItems);
      this.body.appendChild(cells);
      return this.el;
    }
  };
});
