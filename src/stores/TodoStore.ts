import i18n from "i18next";
import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import React from "react";
import { ITodoItem } from "../types";

// Создание класса TodoStore
export class TodoStore {
  // Свойство для опции фильтрации задач
  option = "All";

  // Свойство для текущего языка интерфейса
  currentLanguage = "en";

  // Конструктор класса
  constructor() {
    // Настройка реактивности с помощью MobX
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
      currentLanguage: observable,
      setLanguage: action,
    });

    // Делаем текущий объект хранимым с помощью MobX Persist
    makePersistable(this, {
      name: "TodoStore",
      properties: ["todoItems"],
      storage: localStorage,
    });
  }

  // Начальный список задач
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

  // Метод для установки опции фильтрации
  setFilter(option: string) {
    this.option = option;
  }

  // Метод для установки текущего языка интерфейса
  setLanguage(language: string) {
    this.currentLanguage = language;
    // Изменяем язык интерфейса с использованием i18n
    i18n.changeLanguage(language);
  }

  // Метод для установки списка задач
  setTodoItems = (v: ITodoItem[]) => {
    this.todoItems = v;
  };

  // Свойство для хранения редактируемой задачи
  itemToEdit?: ITodoItem;

  // Метод для установки редактируемой задачи
  setItemToEdit = (v: ITodoItem | undefined) => {
    this.itemToEdit = v;
  };

  // Метод для добавления задачи
  addItem(todoContent: string) {
    if (this.itemToEdit) {
      // Если задача редактируется, то обновляем ее содержимое
      this.itemToEdit.content = todoContent;
      this.itemToEdit = undefined;
      return;
    }

    // Добавляем новую задачу с уникальным идентификатором
    this.todoItems.push({
      id: Date.now(),
      content: todoContent,
      done: false,
    });
  }

  // Метод для переключения состояния задачи (выполнена/не выполнена)
  toggleState = (item: ITodoItem) => {
    item.done = !item.done;
  };

  // Метод для удаления задачи
  removeItem(item: ITodoItem) {
    const indexToRemove = this.todoItems.findIndex(
      (todo) => todo.id === item.id
    );

    // Удаляем задачу из списка
    this.todoItems.splice(indexToRemove, 1);
  }

  // Метод для установки задачи для редактирования
  setEditItem(item: ITodoItem) {
    this.itemToEdit = item;
  }

  // Геттер для получения списка выполненных задач
  get completedTodos() {
    return this.todoItems.filter((item) => item.done);
  }

  // Геттер для получения списка невыполненных задач
  get uncompletedTodos() {
    return this.todoItems.filter((item) => !item.done);
  }
}

// Создание корневого хранилища
const rootStore = { todoStore: new TodoStore() };

// Создание контекста для доступа к хранилищу из компонентов
const TodoStoreContext = React.createContext(rootStore);

// Создание хука для доступа к хранилищу из компонентов
export const useStores = () => React.useContext(TodoStoreContext);
