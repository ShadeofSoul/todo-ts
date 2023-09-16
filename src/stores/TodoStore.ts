import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import React from "react";
import { ITodoItem } from "../types";

export class TodoStore {
  constructor() {
    makeObservable(this, {
      todoItems: observable,
      setTodoItems: action,
      sortedTodoItems: computed,
      itemToEdit: observable,
      setItemToEdit: action,
      addItem: action,
      toggleState: action,
      removeItem: action,
      setEditItem: action,
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

  setTodoItems = (v: ITodoItem[]) => {
    this.todoItems = v;
  };

  get sortedTodoItems(): ITodoItem[] {
    return this.todoItems.slice().sort((a, b) => a.id - b.id);
  }

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
}

const rootStore = { todoStore: new TodoStore() };

const TodoStoreContext = React.createContext(rootStore);
export const useStores = () => React.useContext(TodoStoreContext);
