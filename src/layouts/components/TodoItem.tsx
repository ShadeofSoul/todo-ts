import { observer } from "mobx-react";
import { useStores } from "../../stores/TodoStore";
import { ITodoItem } from "../../types";
import { CheckIcon, DeleteIcon, EditIcon } from "../icons";

interface TodoItemProps {
  item: ITodoItem;
}

export const TodoItem: React.FC<TodoItemProps> = observer(({ item }) => {
  const { todoStore } = useStores();

  const onCheckClick = () => {
    todoStore.toggleState(item);
  };

  const onTrashClick = () => {
    todoStore.removeItem(item);
  };

  const onEditClick = () => {
    todoStore.setEditItem(item);
  };

  const className = "todo-list-item" + (item.done ? " done checked" : "");

  return (
    <li className={className}>
      <span>{item.content}</span>
      <button onClick={onEditClick} disabled={item.done}>
        <EditIcon done={item.done} />
      </button>
      <button onClick={onCheckClick}>
        <CheckIcon checked={item.done} />
      </button>
      <button onClick={onTrashClick}>
        <DeleteIcon />
      </button>
    </li>
  );
});
