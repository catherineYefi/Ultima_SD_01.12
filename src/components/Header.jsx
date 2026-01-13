import React from "react";

export default function Header() {
  return (
    <header className="hero">
      <div className="hero__topline">
        <span className="badge badge--outline">только по диагностике</span>
        <span className="badge badge--grad">ограниченное количество мест</span>
      </div>
      <h1 className="hero__title">ULTIMA 9.0</h1>
      <p className="hero__subtitle">
        Премиальные форматы работы с предпринимателями и командами. Вход —
        только по диагностике.
      </p>
    </header>
  );
}
