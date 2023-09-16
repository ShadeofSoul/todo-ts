import React from "react";
import "./App.scss";
import { TodoAdd, TodoFilter, TodoItemList } from "./layouts/components";
import LanguageSwitcher from "./layouts/components/LanguageSwitcher";

export const App: React.FC = () => {
  return (
    <div className="todo">
      <LanguageSwitcher />
      <h1>Todo List</h1>
      <TodoAdd />
      <TodoFilter />
      <TodoItemList />
    </div>
  );
};
