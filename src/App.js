import React, { useMemo, useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import FormatSelector from "./components/FormatSelector";
import FormatCard from "./components/FormatCard";
import ThemeToggle from "./components/ThemeToggle"; // см. ранее присланный файл

// Данные лежат в /data/formats.js
// Ожидаются экспортированные TABS и FORMATS (новая схема)
import { TABS, FORMATS } from "./data/formats.js";

export default function App() {
  // ----- Табы
  const initialId = TABS?.[0]?.id || "ultima";
  const [activeId, setActiveId] = useState(initialId);
  const activeFormat = useMemo(() => FORMATS?.[activeId], [activeId]);

  // ----- Тема (dark/light) с локальным сохранением
  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem("u_theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {}
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("u_theme", theme);
    } catch (_) {}
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // ----- Страховка, если конфиг не подгрузился
  if (!activeFormat) {
    return (
      <div className="page page--dark">
        <div className="container">
          <div className="board" style={{ padding: 24 }}>
            <div className="board__top">
              <Header />
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
            <div className="card" style={{ marginTop: 16 }}>
              <h2 className="card__title">Нет данных для выбранного формата</h2>
              <p className="card__short">
                Проверьте экспорты <code>TABS</code> и <code>FORMATS</code> в{" "}
                <code>src/data/formats.js</code>. Идентификаторы табов из{" "}
                <code>TABS</code> должны соответствовать ключам в{" "}
                <code>FORMATS</code>.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page page--dark">
      <div className="container">
        <div className="board">
          {/* Верхняя панель: Header + переключатель темы */}
          <div className="board__top">
            <Header />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          <main className="board__content">
            {/* Табы/чипы */}
            <section className="formats">
              <FormatSelector
                tabs={TABS}
                activeId={activeId}
                onChange={setActiveId}
              />

              {/* Карточка активного формата */}
              <article className="card" style={{ marginTop: 12 }}>
                <FormatCard data={activeFormat} />
              </article>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
