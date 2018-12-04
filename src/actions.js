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

const uuidv4 = require("uuid/v4");

export const addProject = text => ({
  type: ADD_PROJECT,
  text,
  id: uuidv4()
});

export const deleteProject = id => ({
  type: DELETE_PROJECT,
  id
});

export const addTodo = (text, projectId) => ({
  type: ADD_TODO,
  projectId,
  text,
  id: uuidv4()
});

export const toggleTodo = (id, projectId) => ({
  type: TOGGLE_TODO,
  id,
  projectId
});

export const deleteTodo = (id, projectId) => ({
  type: DELETE_TODO,
  id,
  projectId
});

export const editTodo = (id, projectId) => ({
  type: EDIT_TODO,
  id,
  projectId
});

export const saveTodo = (text, id, projectId) => ({
  type: SAVE_TODO,
  text,
  id,
  projectId
});

export const addDescription = (id, text, projectId) => ({
  type: ADD_DESCRITION,
  text,
  id,
  projectId
});

export const addSubtask = (subtask, todoId, projectId) => ({
  type: ADD_SUBTASK,
  subtask,
  id: uuidv4(),
  todoId,
  projectId
});

export const deleteSubtask = (id, todoId, projectId) => ({
  type: DELETE_SUBTASK,
  id,
  todoId,
  projectId
});
