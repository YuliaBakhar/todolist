import React, { Component } from "react";
import TodoNav from "./TodoNav.jsx";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoListTask from "./TodoListTask";
import queryString from "query-string";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import { Route } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const MyCard = styled(Card)({
  //margin: "0 auto",
  width: "700px",
  height: "100vh",
  overflow: "auto",
  backgroundColor: "#f5f5f5"
});

const MyToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
});

const FILTER_ALL = "all";
const FILTER_COMPLETED = "completed";
const FILTER_NOT_COMPLITED = "uncompleted";

const filterTodos = (filter, todos) => {
  if (filter === FILTER_COMPLETED) return todos.filter(todo => todo.complete);
  else if (filter === FILTER_NOT_COMPLITED)
    return todos.filter(todo => !todo.complete);
  else return todos;
};

const filterMessage = filter => {
  if (filter === FILTER_COMPLETED) return "You haven't done anything yet :(";
  else if (filter === FILTER_NOT_COMPLITED)
    return "The list of uncompleted tasks is empty. Add your tasks.";
  else if (filter === FILTER_ALL) return "Add your tasks.";
};

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ""
    };
  }
  onOpenTodo = item => {
    this.setState({
      task: item
    });
  };

  render() {
    const {
      project,
      match,
      location,
      history,
      onAddTodo,
      onDeleteTodo,
      onToggleTodo,
      onEditTodo,
      onSaveTodo,
      onAddDescription,
      onAddSubtask
    } = this.props;

    const { filter } = queryString.parse(location.search);
    const visibleTodos = filterTodos(filter, project.todos);
    const message = filterMessage(filter);

    return (
      <div className="todo-project">
        <MyCard>
          <div>
            <AppBar position="static" color="primary">
              <MyToolbar>
                <Typography variant="h6" color="inherit">
                  {project.text}
                </Typography>
                <IconButton onClick={() => history.push("/")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </IconButton>
              </MyToolbar>
            </AppBar>
            <div className="todo">
              <TodoNav path={match.path} />
              <TodoForm onAddTodo={text => onAddTodo(text, project.id)} />
              <TodoList
                location={location}
                match={match}
                message={message}
                todos={visibleTodos}
                onDeleteTodo={id => onDeleteTodo(project.id, id)}
                onToggleTodo={id => onToggleTodo(project.id, id)}
                onEditTodo={id => onEditTodo(project.id, id)}
                onSaveTodo={(text, id) => onSaveTodo(project.id, text, id)}
                onOpenTodo={this.onOpenTodo}
              />
              <br />
            </div>
          </div>
        </MyCard>

        <Route
          path={`${match.path}/:todoId`}
          render={props => (
            <TodoListTask
              {...props}
              task={this.state.task}
              project={project}
              onAddDescription={text =>
                onAddDescription(project.id, this.state.task.id, text)
              }
              onAddSubtask={subtask =>
                onAddSubtask(project.id, this.state.task.id, subtask)
              }
            />
          )}
        />
      </div>
    );
  }
}

export default Todo;
