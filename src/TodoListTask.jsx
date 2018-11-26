import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { styled } from "@material-ui/styles";

const MyCard = styled(Card)({
  padding: "10px",
  flexGrow: 1,
  backgroundColor: "#f5f5f5"
});

class TodoListTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      subtask: ""
    };
  }

  onAddDescription = e => {
    const { text } = this.state;
    e.preventDefault();
    this.props.onAddDescription(text);
  };

  onChangeDescription = e => {
    this.setState({
      text: e.target.value
    });
  };

  onChange = e => {
    this.setState({
      subtask: e.target.value
    });
  };

  onAddSubtask = e => {
    const { subtask } = this.state;
    console.log(subtask);
    e.preventDefault();
    if (subtask.trim() === "") return;
    this.props.onAddSubtask(subtask);
    this.setState({
      subtask: ""
    });
  };

  render() {
    console.log(this.props);
    return (
      <MyCard>
        {this.props.project.todos
          .filter(task => task.id === this.props.match.params.todoId)
          .map(task => (
            <div>
              <Toolbar>
                <IconButton
                  onClick={() =>
                    this.props.history.push(this.props.project.text)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                    <path fill="none" d="M0 0h24v24H0z" />
                  </svg>
                </IconButton>
                <div>Task: {task.text}</div>
              </Toolbar>
              <form>
                <div>Description:</div>
                <div className="todo-project">
                  <textarea
                    className="task-description"
                    onChange={this.onChangeDescription}
                    value={this.state.text || task.description}
                  />
                  <Button onClick={this.onAddDescription}>Save</Button>
                </div>
              </form>
              <div>Subtasks:</div>
              <form onSubmit={this.onAddSubtask}>
                <div className="todo-project">
                  <input
                    className="task-input"
                    value={this.state.subtask}
                    onChange={this.onChange}
                  />
                  <Button onClick={this.onAddSubtask}>Add</Button>
                </div>
                <div>
                  {task.subtasks.map((subtask, index) => (
                    <div key={index}>{subtask.text}</div>
                  ))}
                </div>
              </form>
            </div>
          ))}
      </MyCard>
    );
  }
}

export default TodoListTask;
