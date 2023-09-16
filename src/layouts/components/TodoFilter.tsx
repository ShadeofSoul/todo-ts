import { useStores } from "../../stores/TodoStore";

export const options = ["All", "Completed", "Uncompleted"];

export const TodoFilter = () => {
  const { todoStore } = useStores();

  return (
    <div className="filter">
      {options.map((option, index) => (
        <div
          onClick={() => todoStore.setFilter(option)}
          key={index}
          className="radio-option"
        >
          <input type="radio" name="filter" />
          <label className="radio-label">{option}</label>
        </div>
      ))}
    </div>
  );
};
