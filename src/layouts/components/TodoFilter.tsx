import { options } from "../../stores/TodoOptions";

export const TodoFilter = () => {
  return (
    <div className="filter">
      {options.map((option, index) => (
        <div onClick={(e)=>console.log(e.currentTarget)} key={index} className="radio-option">
          <input type="radio" name="filter" />
          <label className="radio-label">{option}</label>
        </div>
      ))}
    </div>
  );
};
