import { observer } from "mobx-react";
import { useStores } from "../../stores/TodoStore";
import { ITodoItem } from "../../types";
import { CheckIcon, DeleteIcon, EditIcon } from "../icons";

// Интерфейс для свойств компонента TodoItem
interface TodoItemProps {
  item: ITodoItem;
}

// Компонент TodoItem, отмеченный как observer, чтобы следить за изменениями в данных
export const TodoItem: React.FC<TodoItemProps> = observer(({ item }) => {
  // Получаем доступ к хранилищу с помощью хука useStores
  const { todoStore } = useStores();

  // Обработчик клика по кнопке "Отметить как выполнено"
  const onCheckClick = () => {
    // Вызываем метод хранилища для изменения состояния задачи (выполнена/не выполнена)
    todoStore.toggleState(item);
  };

  // Обработчик клика по кнопке "Удалить"
  const onTrashClick = () => {
    // Вызываем метод хранилища для удаления задачи
    todoStore.removeItem(item);
  };

  // Обработчик клика по кнопке "Редактировать"
  const onEditClick = () => {
    // Вызываем метод хранилища для установки задачи в режим редактирования
    todoStore.setEditItem(item);
  };

  // Вычисляем классы для элемента списка задачи на основе ее состояния (выполнена/не выполнена)
  const className = "todo-list-item" + (item.done ? " done checked" : "");

  return (
    <li className={className}>
      {/* Отображаем текст задачи */}
      <span>{item.content}</span>
      {/* Кнопка "Редактировать" (отключена, если задача выполнена) */}
      <button onClick={onEditClick} disabled={item.done}>
        <EditIcon done={item.done} />
      </button>
      {/* Кнопка "Отметить как выполнено" */}
      <button onClick={onCheckClick}>
        <CheckIcon checked={item.done} />
      </button>
      {/* Кнопка "Удалить" */}
      <button onClick={onTrashClick}>
        <DeleteIcon />
      </button>
    </li>
  );
});
