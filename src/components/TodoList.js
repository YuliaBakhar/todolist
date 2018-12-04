import React, { Component } from "react";
import TodoNav from "./TodoNav.jsx";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import queryString from "query-string";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProjectActions from "../actions";
import { Route } from "react-router-dom";
import TodoListTask from "./TodoListTask";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const MyCard = styled(Card)({
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

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null
    };
  }

  onOpenTodo = item => {
    this.setState({
      task: item
    });
  };

  onBackClick = () => {
    this.setState({
      task: null
    });
    this.props.history.push(`/${this.props.project.text}`);
  };

  render() {
    const { match, location, history, project } = this.props;
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
                    version="1.1"
                    viewBox="0 0 212.982 212.982"
                    width="16px"
                    height="16px"
                  >
                    <path
                      d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
                        c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
                        l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
                        c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </IconButton>
              </MyToolbar>
            </AppBar>
            <div className="todo">
              <TodoNav path={match.path} />
              <TodoForm
                onAddTodo={text => this.props.actions.addTodo(text, project.id)}
              />
              <Todo
                location={location}
                match={match}
                message={message}
                {...project}
                todos={visibleTodos}
                onDeleteTodo={id =>
                  this.props.actions.deleteTodo(id, project.id)
                }
                onToggleTodo={id =>
                  this.props.actions.toggleTodo(id, project.id)
                }
                onEditTodo={id => this.props.actions.editTodo(id, project.id)}
                onSaveTodo={(text, id) =>
                  this.props.actions.saveTodo(text, id, project.id)
                }
                // onOpenTodo={this.onOpenTodo}
              />
            </div>
          </div>
        </MyCard>
        {console.log(this.state)}
        <TransitionGroup>
          <CSSTransition
            key={this.state.task ? this.state.task.id : null}
            timeout={500}
            classNames="fade"
          >
            <div className="todo-task">
              <Route
                path={`${match.path}/:todoId`}
                render={props => (
                  <TodoListTask
                    {...props}
                    project={project}
                    todos={visibleTodos}
                    onBackClick={this.onBackClick}
                    onAddDescription={(text, taskId) =>
                      this.props.actions.addDescription(
                        text,
                        taskId,
                        project.id
                      )
                    }
                    onAddSubtask={(taskId, subtask) =>
                      this.props.actions.addSubtask(subtask, taskId, project.id)
                    }
                    onDeleteSubtask={(taskId, id) =>
                      this.props.actions.deleteSubtask(id, taskId, project.id)
                    }
                  />
                )}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ProjectActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
