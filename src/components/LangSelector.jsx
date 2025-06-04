import React from 'react';
import { useTranslation } from 'react-i18next';

const LangSelector = () => {
  const { i18n } = useTranslation();

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <select onChange={changeLang} className="p-2 rounded border bg-white text-black shadow">
        <option value="fr">🇫🇷 Français</option>
        <option value="en">🇬🇧 English</option>
        <option value="ar">🇸🇦 العربية</option>
      </select>
    </div>
  );
};

export default LangSelector;
