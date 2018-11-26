import React from 'react';
import ReactDOM from 'react-dom';
import App, {completeItem} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Test", () => {
 const result = completeItem([{text: "todo1", complete: false}, {text: "todo2", complete: false}], 1);
 expect(result).toEqual([{text: "todo1", complete: false}, {text: "todo2", complete: true}]);
})

it("Test1", () => {
  const result = completeItem([{text: "todo1", complete: false}, {text: "todo2", complete: false}], 0);
  expect(result).toEqual([{text: "todo1", complete: true}, {text: "todo2", complete: false}]);
 })

 it("Test2", () => {
  const initItems = [{text: "todo1", complete: false}, {text: "todo2", complete: false}]
  const resultItems = completeItem(initItems, 0);
  expect(resultItems).not.toBe(initItems);
  expect(resultItems[0]).not.toBe(initItems[0]);
  expect(resultItems[1]).toBe(initItems[1]);
 })