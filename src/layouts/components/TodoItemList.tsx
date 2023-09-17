import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../stores/TodoStore";
import { TodoItem } from "./TodoItem";

// Компонент TodoItemList, отмеченный как observer для реактивности
export const TodoItemList: React.FC = observer(() => {
  // Получаем доступ к хранилищу с помощью хука useStores
  const { todoStore } = useStores();

  // Создаем переменную filteredTodos для хранения отфильтрованных задач
  let filteredTodos = todoStore.todoItems; // По умолчанию показываем все задачи

  // Определяем, какие задачи отображать на основе выбранной опции фильтрации
  if (todoStore.option === "Completed") {
    filteredTodos = todoStore.completedTodos; // Показываем выполненные задачи
  } else if (todoStore.option === "Uncompleted") {
    filteredTodos = todoStore.uncompletedTodos; // Показываем невыполненные задачи
  }

  // Если список задач пуст, выводим сообщение "Please add some todos"
  if (!todoStore.todoItems.length) {
    return <span>Please add some todos</span>;
  }

  // Возвращаем отфильтрованный список задач в виде элементов TodoItem
  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
});
