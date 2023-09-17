import i18n from "i18next";
import React from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import "./App.scss";
import { TodoAdd, TodoFilter, TodoItemList } from "./layouts/components";
import LanguageSwitcher from "./layouts/components/LanguageSwitcher";
import enPageLocales from "./locales/en/en.json";
import ruPageLocales from "./locales/ru/ru.json";

// Инициализация i18n для локализации приложения
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enPageLocales, // Локализация на английском языке
    },
    ru: {
      translation: ruPageLocales, // Локализация на русском языке
    },
  },
  lng: "en", // Устанавливаем начальный язык (английский)
  fallbackLng: "en", // Язык по умолчанию (английский)

  interpolation: {
    escapeValue: false,
  },
});

// Компонент App, который представляет основное приложение
export const App: React.FC = () => {
  // Получаем функцию t для перевода текста на текущий язык
  const { t } = useTranslation();
  return (
    <div className="todo">
      <LanguageSwitcher /> {/* Компонент для переключения языка */}
      <h1>{t("todoList")}</h1>{" "}
      {/* Выводим заголовок, переведенный на текущий язык */}
      <TodoAdd /> {/* Компонент для добавления задачи */}
      <TodoFilter /> {/* Компонент для фильтрации задач */}
      <TodoItemList /> {/* Компонент для списка задач */}
    </div>
  );
};
