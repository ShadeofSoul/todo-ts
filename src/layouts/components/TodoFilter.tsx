import { useState } from "react";
import { useStores } from "../../stores/TodoStore";

export const options = ["All", "Completed", "Uncompleted"];

export const TodoFilter = () => {
  const { todoStore } = useStores();
  // Обновляем активную опцию при выборе
  const [activeOption, setActiveOption] = useState(todoStore.option);

  return (
    <div className="filter">
      {options.map((option, index) => (
        <div
          onClick={() => {
            todoStore.setFilter(option);
            setActiveOption(option);
          }}
          key={index}
          className="radio-option"
        >
          <input type="radio" name="filter" />
          <label
            className={`radio-label ${activeOption === option ? "active" : ""}`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
