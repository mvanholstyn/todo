function createNewTodo(new_todo_form) {
  new_todo_form.request({
    onSuccess: function(response) {
      new_todo_form.reset();
      insertNewTodo(response.responseText);
    }
  });
}

function insertNewTodo(html) {
    var todo = Element.fromHTML(html);
    todo.hide();
    $$(".todos").first().insert(todo);
    todo.appear();
}

function deleteTodo(delete_control, message) {
  if(confirm(message)) {
    delete_control.request({
      method: 'delete'
    });
    delete_control.up(".todo").fade();
  }
}













































// var TodoList = Behavior.create({
//   initialize: function() {
//     this.notice                  = $$(".notice").first();
//     this.todo_list               = this.element;
//     this.new_todo_control        = this.todo_list.down("a.new_todo")
//     this.new_todo_form           = this.todo_list.down("form.new_todo");
//     this.new_todo_form_errors    = this.new_todo_form.down(".errors");
//     this.cancel_new_todo_control = this.new_todo_form.down(".cancel");
//     this.todos                   = this.todo_list.down(".todos");
// 
//     this.new_todo_control.observeExclusively("click", this.showNewTodoForm.bind(this));
//     this.cancel_new_todo_control.observeExclusively("click", this.hideNewTodoForm.bind(this));
//     this.new_todo_form.observeExclusively("submit", this.createNewTodo.bind(this));
//     this.todos.select(".todo").each(this.initializeTodo.bind(this));
// 
//     this.notice.hide();
//     this.new_todo_form.hide();
//   },
//   
//   initializeTodo: function(todo) {
//     var delete_control = todo.down(".delete");
//     delete_control.observeExclusively("click", this.deleteTodo.bind(this, todo, delete_control));
//   },
//   
//   showNewTodoForm: function() {
//     this.new_todo_control.hide();
//     this.new_todo_form.show();
//     this.new_todo_form.focusFirstElement();
//   },
//   
//   hideNewTodoForm: function() {
//     this.new_todo_form.hide();
//     this.new_todo_form.reset();
//     this.new_todo_form_errors.update("");
//     this.new_todo_control.show();
//   },
//   
//   createNewTodo: function() {
//     this.new_todo_form.request({
//       requestHeaders: { 'Accept': 'application/json' },
//       onSuccess: function(json) {
//         this.hideNewTodoForm();
//         this.showNotice(json.notice);
//         this.insertNewTodo(json.html);
//       }.bindAsJSONResponse(this),
//       on422: function(json) {
//         this.showErrors(json.errors);
//       }.bindAsJSONResponse(this)
//     });
//   },
//   
//   insertNewTodo: function(html) {
//     var todo = Element.fromHTML(html);
//     this.initializeTodo(todo);
//     todo.hide();
//     this.todos.insert(todo);
//     todo.appear();
//   },
// 
//   deleteTodo: function(todo, delete_control) {
//     if(confirm(delete_control.getAttribute("data-confirm-message"))) {
//       delete_control.request({
//         requestHeaders: { 'Accept': 'application/json' },
//         method: 'delete',
//         onSuccess: function(json) {
//           this.showNotice(json.notice);
//         }.bindAsJSONResponse(this)
//       });
//       todo.fade();
//     }
//   },
//   
//   showNotice: function(notice) {
//     this.notice.update(notice);
//     this.notice.appear();
//     this.hideNotice.bind(this).delay(10);
//   },
//   
//   hideNotice: function() {
//     this.notice.fade();
//   },
//   
//   showErrors: function(errors) {
//     this.new_todo_form_errors.update(errors);
//   }
// });
// 
// Event.addBehavior({
//   '.todo_list': TodoList
// });
