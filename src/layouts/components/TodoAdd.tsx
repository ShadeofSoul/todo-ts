import React from "react";
import { reaction } from "mobx";
import { useStores } from "../../stores/TodoStore";
import { AddIcon } from "../icons";
export const TodoAdd = () => {
  const { todoStore } = useStores();

  const input = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.current && input.current.value) {
      todoStore.addItem(input.current.value);
      input.current.value = "";
    }
  };

  React.useEffect(() => {
    reaction(
      () => todoStore.itemToEdit,
      () => {
        if (input.current && todoStore.itemToEdit) {
          input.current.value = todoStore.itemToEdit.content;
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={input}
        type="text"
        name="todo-content"
        placeholder="Add todo"
        className="todo-form-input"
      />
      <button className="todo-form-button">
        <AddIcon />
      </button>
    </form>
  );
};
