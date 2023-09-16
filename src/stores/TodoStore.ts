import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import React from "react";
import { ITodoItem } from "../types";

export class TodoStore {
  option = "All";
  constructor() {
    makeObservable(this, {
      todoItems: observable,
      setTodoItems: action,
      itemToEdit: observable,
      setItemToEdit: action,
      addItem: action,
      toggleState: action,
      setFilter: action,
      removeItem: action,
      setEditItem: action,
      option: observable,
      completedTodos: computed,
      uncompletedTodos: computed,
    });

    makePersistable(this, {
      name: "TodoStore",
      properties: ["todoItems"],
      storage: localStorage,
    });
  }

  todoItems: ITodoItem[] = [
    {
      id: 1,
      content: "Ditch redux",
      done: true,
    },
    {
      id: 2,
      content: "Learn MobX",
      done: false,
    },
  ];
  setFilter(option: string) {
    this.option = option;
  }
  setTodoItems = (v: ITodoItem[]) => {
    this.todoItems = v;
  };

  itemToEdit?: ITodoItem;

  setItemToEdit = (v: ITodoItem | undefined) => {
    this.itemToEdit = v;
  };

  addItem(todoContent: string) {
    if (this.itemToEdit) {
      this.itemToEdit.content = todoContent;
      this.itemToEdit = undefined;
      return;
    }

    this.todoItems.push({
      id: Date.now(),
      content: todoContent,
      done: false,
    });
  }

  toggleState = (item: ITodoItem) => {
    item.done = !item.done;
  };

  removeItem(item: ITodoItem) {
    const indexToRemove = this.todoItems.findIndex(
      (todo) => todo.id === item.id
    );

    this.todoItems.splice(indexToRemove, 1);
  }

  setEditItem(item: ITodoItem) {
    this.itemToEdit = item;
  }
  get completedTodos() {
    return this.todoItems.filter((item) => item.done);
  }

  get uncompletedTodos() {
    return this.todoItems.filter((item) => !item.done);
  }
}

const rootStore = { todoStore: new TodoStore() };

const TodoStoreContext = React.createContext(rootStore);
export const useStores = () => React.useContext(TodoStoreContext);
