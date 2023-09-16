import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStores } from "../../stores/TodoStore";

export const TodoFilter = () => {
  const { todoStore } = useStores();
  const { t } = useTranslation();
  const options = [
    {
      text: t("all"),
      code: "All",
    },
    {
      text: t("completed"),
      code: "Completed",
    },
    {
      text: t("uncompleted"),
      code: "Uncompleted",
    },
  ];
  // Обновляем активную опцию при выборе
  const [activeOption, setActiveOption] = useState(todoStore.option);

  return (
    <div className="filter">
      {options.map((option, index) => (
        <div
          onClick={() => {
            todoStore.setFilter(option.code);
            setActiveOption(option.code);
          }}
          key={index}
          className="radio-option"
        >
          <input type="radio" name="filter" />
          <label
            className={`radio-label ${
              activeOption === option.code ? "active" : ""
            }`}
          >
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
};
