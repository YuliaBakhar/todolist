import React, { Component } from "react";
import "typeface-roboto";
import "./App.css";
import Todo from "./Todo";
import TodoProjectForm from "./TodoProjectForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
const uuidv4 = require("uuid/v4");

export const toggleItem = (projects, projectId, id) => {
  return projects.map(project =>
    projectId === project.id
      ? {
          ...project,
          todos: project.todos.map(item => {
            if (item.id !== id) return item;
            return { ...item, complete: !item.complete };
          })
        }
      : project
  );
};

const editItem = (projects, projectId, id) => {
  return projects.map(project =>
    projectId === project.id
      ? {
          ...project,
          todos: project.todos.map(item => {
            if (item.id !== id) return item;
            return { ...item, editing: true };
          })
        }
      : project
  );
};

const saveItem = (projects, projectId, text, id) => {
  return projects.map(project =>
    projectId === project.id
      ? {
          ...project,
          todos: project.todos.map(item => {
            if (item.id !== id) return item;
            return { ...item, text: text, editing: false };
          })
        }
      : project
  );
};

const addDescription = (projects, projectId, id, text) => {
  return projects.map(project =>
    projectId === project.id
      ? {
          ...project,
          todos: project.todos.map(item => {
            if (item.id !== id) return item;
            return { ...item, description: text };
          })
        }
      : project
  );
};

const addSubtask = (projects, projectId, id, subtask) => {
  return projects.map(project =>
    projectId === project.id
      ? {
          ...project,
          todos: project.todos.map(item => {
            if (item.id !== id) return item;
            return {
              ...item,
              subtasks: [...item.subtasks, { text: subtask, id: uuidv4() }]
            };
          })
        }
      : project
  );
};

const getLocalStorage = () => {
  try {
    return localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects"))
      : [];
  } catch {
    return [];
  }
};

class TodoProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: getLocalStorage()
    };
  }

  componentDidUpdate() {
    localStorage.setItem("projects", JSON.stringify(this.state.projects));
  }

  addProject = text => {
    const { projects } = this.state;
    this.setState({
      projects: [{ text, id: uuidv4(), todos: [] }, ...projects]
    });
  };

  onDeleteProject = id => {
    const { projects } = this.state;
    this.setState({
      projects: projects.filter(project => project.id !== id)
    });
  };

  onAddTodo = (text, projectId) => {
    const { projects } = this.state;
    this.setState({
      projects: projects.map(project =>
        projectId === project.id
          ? {
              ...project,
              todos: [
                ...project.todos,
                {
                  id: uuidv4(),
                  text,
                  complete: false,
                  editing: false,
                  subtasks: [],
                  descripion: ""
                }
              ]
            }
          : project
      )
    });
  };

  onEditTodo = (projectId, id) => {
    this.setState({
      projects: editItem(this.state.projects, projectId, id)
    });
  };

  onSaveTodo = (projectId, text, id) => {
    this.setState({
      projects: saveItem(this.state.projects, projectId, text, id)
    });
  };

  onDeleteTodo = (projectId, id) => {
    const { projects } = this.state;
    this.setState({
      projects: projects.map(project =>
        projectId === project.id
          ? { ...project, todos: project.todos.filter(todo => todo.id !== id) }
          : project
      )
    });
  };

  onToggleTodo = (projectId, id) => {
    this.setState({
      projects: toggleItem(this.state.projects, projectId, id)
    });
  };

  onAddDescription = (projectId, id, text) => {
    this.setState({
      projects: addDescription(this.state.projects, projectId, id, text)
    });
  };

  onAddSubtask = (projectId, id, subtask) => {
    this.setState({
      projects: addSubtask(this.state.projects, projectId, id, subtask)
    });
  };

  onDeleteSubtask = (projectId, todoId, id) => {
    const { projects } = this.state;
    this.setState({
      projects: projects.map(project =>
        projectId === project.id
          ? {
              ...project,
              todos: project.todos.map(todo =>
                todo.id === todoId
                  ? {
                      ...todo,
                      subtasks: todo.subtasks.filter(
                        subtask => subtask.id !== id
                      )
                    }
                  : todo
              )
            }
          : project
      )
    });
  };

  render() {
    const { projects } = this.state;
    return (
      <Router>
        <div className="todo-app">
          <TodoProjectForm
            projects={projects}
            onDelete={this.onDeleteProject}
            onCreate={this.addProject}
          />
          {projects.map(project => (
            <Route
              key={project.id}
              path={`/${project.text}`}
              render={props => (
                <Todo
                  {...props}
                  project={project}
                  onAddTodo={this.onAddTodo}
                  onDeleteTodo={this.onDeleteTodo}
                  onToggleTodo={this.onToggleTodo}
                  onEditTodo={this.onEditTodo}
                  onSaveTodo={this.onSaveTodo}
                  onAddDescription={this.onAddDescription}
                  onAddSubtask={this.onAddSubtask}
                  onDeleteSubtask={this.onDeleteSubtask}
                />
              )}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default TodoProject;
