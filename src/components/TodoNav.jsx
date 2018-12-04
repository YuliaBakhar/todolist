import React, { Component } from "react";
import { Link } from "react-router-dom";

class TodoNav extends Component {
  render() {
    const { path } = this.props;
    return (
      <nav>
        <ul className="todo-nav">
          <li>
            <Link
              to={{ pathname: `${path}`, search: "?filter=all" }}
              className="todo-nav-list"
            >
              All
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: `${path}`, search: "?filter=completed" }}
              className="todo-nav-list"
            >
              Completed
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: `${path}`, search: "?filter=uncompleted" }}
              className="todo-nav-list"
            >
              Not completed
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default TodoNav;
