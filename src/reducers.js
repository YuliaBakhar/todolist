import { combineReducers } from "redux";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SAVE_TODO,
  ADD_DESCRITION,
  ADD_SUBTASK,
  DELETE_SUBTASK
} from "./constants";

const getLocalStorage = () => {
  try {
    return localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects"))
      : [];
  } catch {
    return [];
  }
};

const projects = (state = getLocalStorage(), action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          todos: []
        }
      ];
    case DELETE_PROJECT:
      return state.filter(project => project.id !== action.id);
    case ADD_TODO:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: [
                ...project.todos,
                {
                  id: action.id,
                  text: action.text,
                  complete: false,
                  editing: false,
                  description: "",
                  subtasks: []
                }
              ]
            }
          : project
      );
    case TOGGLE_TODO:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: project.todos.map(todo => {
                if (todo.id !== action.id) return todo;
                return { ...todo, complete: !todo.complete };
              })
            }
          : project
      );
    case DELETE_TODO:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: project.todos.filter(todo => todo.id !== action.id)
            }
          : project
      );
    case EDIT_TODO:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: project.todos.map(item => {
                if (item.id !== action.id) return item;
                return { ...item, editing: true };
              })
            }
          : project
      );
    case SAVE_TODO:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: project.todos.map(item => {
                if (item.id !== action.id) return item;
                return { ...item, text: action.text, editing: false };
              })
            }
          : project
      );
    case ADD_DESCRITION:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: project.todos.map(item => {
                if (item.id !== action.id) return item;
                return { ...item, description: action.text };
              })
            }
          : project
      );
    case ADD_SUBTASK:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: project.todos.map(todo => {
                if (todo.id !== action.todoId) return todo;
                return {
                  ...todo,
                  subtasks: [
                    ...todo.subtasks,
                    { text: action.subtask, id: action.id }
                  ]
                };
              })
            }
          : project
      );
    case DELETE_SUBTASK:
      return state.map(project =>
        action.projectId === project.id
          ? {
              ...project,
              todos: project.todos.map(todo =>
                todo.id === action.todoId
                  ? {
                      ...todo,
                      subtasks: todo.subtasks.filter(
                        subtask => subtask.id !== action.id
                      )
                    }
                  : todo
              )
            }
          : project
      );
    default:
      return state;
  }
};

export default combineReducers({
  projects
});
