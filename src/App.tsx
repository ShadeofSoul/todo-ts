import React from "react";
import "./App.scss";
import { TodoAdd, TodoFilter, TodoItemList } from "./layouts/components";

export const App: React.FC = () => {
  return (
    <div className="todo">
      <TodoAdd />
      <TodoFilter />
      <TodoItemList />
    </div>
  );
};
