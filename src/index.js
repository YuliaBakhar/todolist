import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import TodoProject from "./components/TodoProject";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <TodoProject />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
