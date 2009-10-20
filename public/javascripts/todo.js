var TodoList = Class.create({
  initialize: function(todo_list) {
    this.todo_list               = todo_list;
    this.new_todo_control        = this.todo_list.down("a.new_todo")
    this.new_todo_form           = this.todo_list.down("form.new_todo");
    this.cancel_new_todo_control = this.new_todo_form.down(".cancel");
    this.todos                   = this.todo_list.down(".todos");
    
    this.hideNewTodoForm();

    this.new_todo_control.observeExclusively("click", this.showNewTodoForm.bind(this));
    this.cancel_new_todo_control.observeExclusively("click", this.hideNewTodoForm.bind(this));
    this.new_todo_form.observeExclusively("submit", this.createNewTodo.bind(this));
    this.todos.select(".todo").each(this.initializeTodo.bind(this));
  },
  
  initializeTodo: function(todo) {
    var delete_control = todo.down(".delete");
    delete_control.observeExclusively("click", this.deleteTodo.bind(this, todo, delete_control));
  },
  
  showNewTodoForm: function() {
    this.new_todo_control.hide();
    this.new_todo_form.show();
    this.new_todo_form.focusFirstElement();
  },
  
  hideNewTodoForm: function() {
    this.new_todo_form.hide();
    this.new_todo_form.reset();
    this.new_todo_control.show();
  },
  
  createNewTodo: function() {
    this.new_todo_form.request({
      onSuccess: function(json) {
        this.hideNewTodoForm();
        this.showNotice(json.notice);
        this.insertNewTodo(json.html);
      }.bindAsJSONResponse(this)
    });
  },
  
  insertNewTodo: function(html) {
    var element = Element.fromHTML(html);
    element.hide();
    this.todos.insert({ bottom: element });
    element.appear();
  },

  deleteTodo: function(todo, delete_control) {
    if(confirm("Are you sure?")) {
      delete_control.request({ method: 'delete' });
      todo.fade();
    }
  },
  
  showNotice: function(notice) {
    $$(".notice").first().update(notice);
  }
});

document.observe('dom:loaded', function() {
  $$(".todo_list").each(function(todo_list) {
    new TodoList(todo_list);
  });
});