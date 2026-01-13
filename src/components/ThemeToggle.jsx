import React from "react";

export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === "light";
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isLight ? "Включить тёмную тему" : "Включить светлую тему"}
      title={isLight ? "Тёмная тема" : "Светлая тема"}
    >
      {isLight ? (
        // Moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        // Sun
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      )}
      <span className="theme-toggle__label">{isLight ? "Light" : "Dark"}</span>
    </button>
  );
}
