/* eslint-disable react/prop-types */
import { useState } from "react";
import { languages } from "../languagesData";

function TranslatorApp({ handleCloseApp }) {
  const [selectedLanguageFrom, setSelectedLanguageFrom] = useState("en-GB");
  const [selectedLanguageTo, setSelectedLanguageTo] = useState("en-GB");
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLanguageSelection, setCurrentLanguageSelection] =
    useState(null);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  function handleShowLanguages(type) {
    setShowLanguages(true);
    setCurrentLanguageSelection(type);
  }

  function handleLanguageSelected(languageCode) {
    if (currentLanguageSelection === "from") {
      setSelectedLanguageFrom(languageCode);
    } else {
      setSelectedLanguageTo(languageCode);
    }
    setShowLanguages(false);
  }

  function handleSwapLanguages() {
    setSelectedLanguageFrom(selectedLanguageTo);
    setSelectedLanguageTo(selectedLanguageFrom);
  }

  async function translateText() {
    if (!inputText) return null;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      inputText
    )}!&langpair=${selectedLanguageFrom}|${selectedLanguageTo}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setTranslatedText(data.responseData.translatedText);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      translateText();
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-4 justify-center items-center px-8 pt-12 pb-6 relative">
      <button className="absolute top-4 right-4" onClick={handleCloseApp}>
        <i className="fa-solid fa-xmark text-xl text-gray-300"></i>
      </button>
      <div className="w-full min-h-20 flex justify-center items-center px-4 bg-gradient-to-r from-[#b6f492] to-[#338b93] text-gray-700 rounded-lg">
        <div className="language" onClick={() => handleShowLanguages("from")}>
          {languages[selectedLanguageFrom] || "English"}
        </div>
        <i
          className="fa-solid fa-arrows-rotate text-2xl mx-8 cursor-pointer"
          onClick={handleSwapLanguages}
        ></i>
        <div className="language" onClick={() => handleShowLanguages("to")}>
          {languages[selectedLanguageTo] || "English"}
        </div>
      </div>
      {showLanguages && (
        <div className="w-[calc(100%-4rem)] h-[calc(100%-9rem)] bg-gradient-to-r from-[#b6f492] to-[#338b93] absolute top-32 left-8 z-10 rounded shadow-lg p-4 overflow-y-scroll scrollbar-hide">
          <ul>
            {Object.entries(languages).map(([code, language]) => (
              <li
                className="cursor-pointer hover:bg-[#10646b] transition duration-200 p-2 rounded"
                key={code}
                onClick={() => handleLanguageSelected(code)}
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full relative">
        <textarea
          className="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="absolute bottom-2 right-4 text-gray-400">0/300</div>
      </div>
      <button className="w-12 h-12 bg-gradient-to-r from-[#b6f492] to-[#338b93] rounded-full text-2xl text-gray-600 flex justify-center items-center active:translate-y-[1px]">
        <i className="fa-solid fa-chevron-down" onClick={translateText}></i>
      </button>
      <div className="w-full">
        <textarea
          className="textarea"
          value={translatedText}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default TranslatorApp;
