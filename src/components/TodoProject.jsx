import React, { Component } from "react";
import "typeface-roboto";
import "../App.css";
import TodoList from "./TodoList";
import TodoProjectForm from "./TodoProjectForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

class TodoProject extends Component {
  componentDidUpdate() {
    localStorage.setItem("projects", JSON.stringify(this.props.projects));
  }

  render() {
    return (
      <Router>
        <div className="todo-app">
          <TodoProjectForm />
          {this.props.projects.map(project => (
            <Route
              key={project.id}
              path={`/${project.text}`}
              render={props => <TodoList {...props} project={project} />}
            />
          ))}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects
});

export default connect(mapStateToProps)(TodoProject);
