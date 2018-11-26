import React, { Component } from "react";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this.todoInput.focus();
  }

  onSubmit = e => {
    const { text } = this.state;
    e.preventDefault();
    if (text.trim() === "") return;
    this.props.onAddTodo(text);
    this.setState({
      text: ""
    });
  };

  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  render() {
    const { text } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="todo-input"
          placeholder="Your task"
          value={text}
          ref={input => {
            this.todoInput = input;
          }}
          onChange={this.onChange}
        />
      </form>
    );
  }
}

export default TodoForm;
