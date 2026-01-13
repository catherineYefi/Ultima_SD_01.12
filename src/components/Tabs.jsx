import React from "react";

export default function Tabs({ tabs, activeId, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Форматы">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={activeId === t.id}
          className={`chip ${activeId === t.id ? "chip--active" : ""}`}
          onClick={() => onChange(t.id)}
        >
          <span className="chip__icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                opacity="0.6"
              />
            </svg>
          </span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
