import { reaction } from "mobx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useStores } from "../../stores/TodoStore";
import { AddIcon } from "../icons";

// Компонент для добавления новых задач
export const TodoAdd = () => {
  // Получаем доступ к хранилищу с помощью хука useStores
  const { todoStore } = useStores();

  // Используем хук для перевода текстовых строк
  const { t } = useTranslation();

  // Создаем ссылку на текстовое поле ввода
  const input = React.useRef<HTMLInputElement | null>(null);

  // Обработчик отправки формы для добавления задачи
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Устанавливаем фильтр "All" для отображения всех задач
    todoStore.setFilter("All");
    if (input.current && input.current.value) {
      // Добавляем новую задачу с текстом из поля ввода
      todoStore.addItem(input.current.value);
      // Очищаем поле ввода после добавления задачи
      input.current.value = "";
    }
  };

  // Эффект для реакции на изменение редактируемой задачи
  React.useEffect(() => {
    reaction(
      // Отслеживаем изменения в редактируемой задаче
      () => todoStore.itemToEdit,
      () => {
        if (input.current && todoStore.itemToEdit) {
          // Если редактируемая задача изменяется, то обновляем текст в поле ввода
          input.current.value = todoStore.itemToEdit.content;
        }
      }
    );
  }, [todoStore.itemToEdit]);

  return (
    <>
      {/* Форма для добавления новых задач */}
      <form className="todo-form" onSubmit={handleSubmit}>
        {/* Поле ввода для текста задачи */}
        <input
          ref={input}
          type="text"
          name="todo-content"
          // Используем перевод для атрибута placeholder
          placeholder={t("addTodo")}
          className="todo-form-input"
        />
        {/* Кнопка для добавления задачи */}
        <button className="todo-form-button">
          <AddIcon />
        </button>
      </form>
    </>
  );
};
