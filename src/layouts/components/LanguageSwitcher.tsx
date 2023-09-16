import { observer } from "mobx-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useStores } from "../../stores/TodoStore";

const LanguageSwitcher: React.FC = observer(() => {
  const { todoStore } = useStores();
  const { t } = useTranslation();
  const handleLanguageChange = (language: string) => {
    todoStore.setLanguage(language);
  };

  return (
    <div
      className="language"
      role="radiogroup"
      aria-labelledby="language-switcher1"
    >
      <div
        className={`language__container--left language__container--${
          todoStore.currentLanguage === "ru" ? "active" : ""
        }`}
      >
        <input
          className="language__control"
          type="radio"
          id="language1-1"
          name="language-switch1"
          checked={todoStore.currentLanguage === "ru"}
          onChange={() => handleLanguageChange("ru")}
        />
        <label className="language__label" htmlFor="language1-1">
          {t("ru")}
        </label>
      </div>
      <div
        className={`language__container--right language__container--${
          todoStore.currentLanguage === "en" ? "active" : ""
        }`}
      >
        <input
          className="language__control"
          type="radio"
          id="language1-2"
          name="language-switch1"
          checked={todoStore.currentLanguage === "en"}
          onChange={() => handleLanguageChange("en")}
        />
        <label className="language__label" htmlFor="language1-2">
          {t("en")}
        </label>
      </div>
    </div>
  );
});

export default LanguageSwitcher;
