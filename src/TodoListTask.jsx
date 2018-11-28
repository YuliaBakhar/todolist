import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/styles";

const MyCard = styled(Card)({
  width: "100%",
  padding: "0 10px",
  height: "100vh",
  flexGrow: 1,
  backgroundColor: "#EEEEEE"
});

const SubtaskCard = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "10px",
  marginTop: "5px"
});

class TodoListTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      subtaskText: ""
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
      subtaskText: e.target.value
    });
  };

  onAddSubtask = e => {
    const { subtaskText } = this.state;
    e.preventDefault();
    if (subtaskText.trim() === "") return;
    this.props.onAddSubtask(this.props.match.params.todoId, subtaskText);
    this.setState({
      subtaskText: ""
    });
  };

  render() {
    const { todos, match, onDeleteSubtask } = this.props;
    const task = todos.find(el => el.id === match.params.todoId);
    return (
      <div>
        <MyCard key={task.id}>
          <Toolbar>
            <Button onClick={this.props.onBackClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            </Button>
            <div>Task: {task.text}</div>
          </Toolbar>
          <form>
            <div>Description:</div>
            <div className="todo-project">
              <textarea
                placeholder="Enter description"
                className="task-description"
                onChange={this.onChangeDescription}
                defaultValue={task.description}
              />
              <Button onClick={this.onAddDescription}>Save</Button>
            </div>
          </form>
          <div>Subtasks:</div>
          <form onSubmit={this.onAddSubtask}>
            <div className="todo-project">
              <input
                placeholder="Enter subtask"
                className="task-input"
                value={this.state.subtaskText}
                onChange={this.onChange}
              />
              <Button onClick={this.onAddSubtask}>Add</Button>
            </div>
            <div>
              {task.subtasks.map(subtask => (
                <SubtaskCard key={subtask.id}>
                  {subtask.text}
                  <Button onClick={() => onDeleteSubtask(task.id, subtask.id)}>
                    Remove
                  </Button>
                </SubtaskCard>
              ))}
            </div>
          </form>
        </MyCard>
      </div>
    );
  }
}

export default TodoListTask;
