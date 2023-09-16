import React, { useState } from "react";

const LanguageSwitcher: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div
      className="language"
      role="radiogroup"
      aria-labelledby="language-switcher1"
    >
      <div
        className={`language__container--left language__container--${
          selectedLanguage === "fr" ? "active" : ""
        }`}
      >
        <input
          className="language__control"
          type="radio"
          id="language1-1"
          name="language-switch1"
          checked={selectedLanguage === "fr"}
          onChange={() => handleLanguageChange("fr")}
        />
        <label className="language__label" htmlFor="language1-1">
          RU
        </label>
      </div>
      <div
        className={`language__container--right language__container--${
          selectedLanguage === "en" ? "active" : ""
        }`}
      >
        <input
          className="language__control"
          type="radio"
          id="language1-2"
          name="language-switch1"
          checked={selectedLanguage === "en"}
          onChange={() => handleLanguageChange("en")}
        />
        <label className="language__label" htmlFor="language1-2">
          EN
        </label>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
