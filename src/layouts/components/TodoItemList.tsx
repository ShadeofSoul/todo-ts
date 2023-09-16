import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../stores/TodoStore";
import { TodoItem } from "./TodoItem";

export const TodoItemList: React.FC = observer(() => {
  const { todoStore } = useStores();
  React.useEffect(() => {
    // Получите отсортированный/отфильтрованный массив
    const sortedItems = todoStore.sortedTodoItems();

    // Обновите todoItems в todoStore
    todoStore.setTodoItems(sortedItems);
  }, [todoStore.option]);

  if (!todoStore.todoItems.length) {
    return <span>Please add some todos</span>;
  }

  return (
    <ul className="todo-list">
      {todoStore.todoItems.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
});
