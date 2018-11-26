import React, { Component } from "react";
import { styled } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
const classNames = require("classnames");

const MyCard = styled(Card)({
  display: "flex",
  marginTop: "10px",
  padding: "6px",
  width: "100%",
  height: "60px"
});

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  edit = (text, id) => {
    this.setState({
      text: text
    });
    this.props.onEditTodo(id);
  };

  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  save = id => {
    const { text } = this.state;
    if (text.trim() === "") return;
    this.props.onSaveTodo(text, id);
    this.setState({
      text: ""
    });
  };

  render() {
    const {
      todos,
      message,
      onToggleTodo,
      onDeleteTodo,
      onOpenTodo,
      match
    } = this.props;
    return (
      <div>
        {todos.length === 0
          ? message
          : todos.map(item => (
              <div key={item.id}>
                <MyCard>
                  <Checkbox
                    color="default"
                    onClick={() => onToggleTodo(item.id)}
                    checked={item.complete}
                    value="checkedC"
                  />

                  <form
                    className="todo-content"
                    onSubmit={e => {
                      e.preventDefault();
                      this.save(item.id);
                    }}
                  >
                    <input
                      className={classNames("todo-list", {
                        "todo-complete": item.complete,
                        "todo-edit": item.editing
                      })}
                      onChange={this.onChange}
                      defaultValue={item.text}
                      disabled={!item.editing}
                    />
                    {item.editing ? (
                      <Button onClick={() => this.save(item.id)}>Save</Button>
                    ) : (
                      <Button onClick={() => this.edit(item.text, item.id)}>
                        Edit
                      </Button>
                    )}
                    <Button onClick={() => onDeleteTodo(item.id)}>
                      Remove
                    </Button>
                  </form>
                  <Link
                    to={{
                      pathname: `${match.url}/${item.id}`
                    }}
                  >
                    <Button onClick={() => onOpenTodo(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                    </Button>
                  </Link>
                </MyCard>
              </div>
            ))}
      </div>
    );
  }
}

export default TodoList;
