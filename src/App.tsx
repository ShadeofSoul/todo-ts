import i18n from "i18next";
import React from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import "./App.scss";
import { TodoAdd, TodoFilter, TodoItemList } from "./layouts/components";
import LanguageSwitcher from "./layouts/components/LanguageSwitcher";
import enPageLocales from "./locales/en/en.json";
import ruPageLocales from "./locales/ru/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enPageLocales,
    },
    ru: {
      translation: ruPageLocales,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="todo">
      <LanguageSwitcher />
      <h1>{t("todoList")}</h1>
      <TodoAdd />
      <TodoFilter />
      <TodoItemList />
    </div>
  );
};
