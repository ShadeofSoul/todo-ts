import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../stores/TodoStore";
import { TodoItem } from "./TodoItem";

export const TodoItemList: React.FC = observer(() => {
  const { todoStore } = useStores();
  let filteredTodos = todoStore.todoItems; // По умолчанию показываем все задачи

  if (todoStore.option === "Completed") {
    filteredTodos = todoStore.completedTodos; // Показываем выполненные задачи
  } else if (todoStore.option === "Uncompleted") {
    filteredTodos = todoStore.uncompletedTodos; // Показываем невыполненные задачи
  }


  
  if (!todoStore.todoItems.length) {
    return <span>Please add some todos</span>;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
});
