"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return {
      text:'',
      isEdit:0,
      todos: [{ "id": "00001", "text": "Wake up" }, { "id": "00002", "text": "Eat breakfast" }, { "id": "00003", "text": "Go to work" }]
    };
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
        React.createElement(TodoForm, _extends({},this.state, {
          onTodoAdd: this.handleTodoAdd,
          changeText: this.handleChangetext,
          onTodoUpdate: this.handleTodoUpdate
        })),

        React.createElement(TodoList, {
        todos: this.state.todos,
        deleteTodo: this.handledeleteTodo,
        editTodo: this.handleditTodo
        })
    );
  },
  handleTodoAdd: function(text) {

    var newTodo = {
      id: this.state.todos.length + 1,
      text: text
    };
    this.setState({ todos: this.state.todos.concat(newTodo) });
  },

  handleChangetext: function(text) {
    this.setState({ text: text });
  },

  handledeleteTodo: function handledeleteTodo(todo) {
    var todos = this.state.todos;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == todo.id) {
        todos.splice(i, 1);
      }
    }
    this.setState({ todos: todos });
  },

  handleTodoUpdate: function(todo) {
    var todos = this.state.todos;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == todo.id) {
        todos.splice(i, 1);
      }
    }
    todos.push(todo);
    this.setState({ todos: todos, isEdit: 0, text: "" });
  },

  handleditTodo: function handleditTodo(todo) {

    this.setState({
      text: todo.text,
      isEdit: todo.id

    });
  }

});

var TodoForm = React.createClass({
  displayName: "TodoForm",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { onSubmit: this.onSubmit },
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            null,
            "Text"
          ),
          React.createElement("input", { type: "text", ref: "text", value: this.props.text, onChange: this.onChange})
        )
      )
    );
  },
  onChange: function onChange(e) {
    this.props.changeText(e.target.value);
  },
  onSubmit: function onSubmit(e) {
    e.preventDefault();
    var text = this.refs.text.value.trim();
    if (!text) {
      alert('Enter your ToDo');
      return;
    }
    if(this.props.isEdit){
      //alert(this.props.isEdit);
      var updatedtodo = {
        id: this.props.isEdit,
        text: text
      }
      console.log(updatedtodo);
      this.props.onTodoUpdate(updatedtodo);

    }else{
      this.props.onTodoAdd(text);
    }

    this.refs.text.value = '';
  }
});

var TodoList = React.createClass({
  displayName: "TodoList",

  render: function render() {
    var _this = this;

    return React.createElement(
      "ul",
      { className: "list-group" },
      this.props.todos.map(function (todo) {
        return React.createElement(
          "li",
          { className: "list-group-item", todo: todo, key: todo.id },
            React.createElement(
                "span",
                {  onClick: _this.onEdit.bind(_this, todo) },
                todo.text
            ),

          " ",
          React.createElement(
            "a",
            { href: "#", onClick: _this.onDelete.bind(_this, todo) },
            "x"
          )
        );
      })
    );
  },
  onDelete: function onDelete(todo) {

    this.props.deleteTodo(todo);
  },
  onEdit: function onEdit(todo) {

    this.props.editTodo(todo);
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));