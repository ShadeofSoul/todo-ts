import { observer } from "mobx-react";
import { useStores } from "../../stores/TodoStore";
import { TodoItem } from "./TodoItem";

export const TodoItemList: React.FC = observer(() => {
  const { todoStore } = useStores();

  if (!todoStore.todoItems.length) {
    return <span>Please add some todos</span>;
  }

  return (
    <ul className="todo-list">
      {todoStore.sortedTodoItems.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
});
