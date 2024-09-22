import { useState } from "react";
import TranslatorApp from "./components/TranslatorApp";
import TranslatorStart from "./components/TranslatorStart";

function App() {
  const [showTranslatorApp, setShowTranslatorApp] = useState(false);

  function handleShowApp() {
    setShowTranslatorApp(true);
  }

  function handleCloseApp() {
    setShowTranslatorApp(false);
  }

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#b6f492] to-[#338b93] flex justify-center items-center">
      <div className="w-[90%] max-w-lg bg-[#2d2d2d] rounded-xl shadow-2xl shadow-gray-800 flex flex-col">
        {showTranslatorApp ? (
          <TranslatorApp handleCloseApp={handleCloseApp} />
        ) : (
          <TranslatorStart handleShowApp={handleShowApp} />
        )}
      </div>
    </div>
  );
}

export default App;
