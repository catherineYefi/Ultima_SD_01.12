import React, { useState } from "react";
import PriceTable from "./PriceTable.jsx";

function Accordion({ items = [] }) {
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <AccItem key={i} title={it.title} content={it.content} />
      ))}
    </div>
  );
}

function AccItem({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`acc ${open ? "acc--open" : ""}`}>
      <button className="acc__head" onClick={() => setOpen((v) => !v)}>
        <span className="acc__title">{title}</span>
        <span className="acc__icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" />
          </svg>
        </span>
      </button>
      <div className="acc__body" style={{ maxHeight: open ? "420px" : "0px" }}>
        <div className="acc__content">
          {String(content || "")
            .split("\n")
            .map((ln, i) => (
              <p key={i}>{ln}</p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default function FormatCard({ data }) {
  if (!data) return null;

  const hero = data.hero || {
    title: data.title,
    subtitle: data.short,
    badges: [],
  };
  const pricing = data.pricing
    ? {
        rows: data.pricing.rows,
        note: data.pricing.note,
        foot: data.pricing.foot,
      }
    : { rows: data.tariffs || [], note: "", foot: data.footerNote || "" };

  return (
    <article className="card">
      {/* Hero внутри карточки */}
      <header className="hero hero--in-card">
        <div className="hero__topline">
          {(hero.badges || []).map((b, i) => (
            <span
              key={i}
              className={`badge ${i === 1 ? "badge--grad" : "badge--outline"}`}
            >
              {b}
            </span>
          ))}
        </div>
        <h2 className="card__title">{hero.title}</h2>
        {hero.subtitle && <p className="card__short">{hero.subtitle}</p>}
      </header>

      {/* Формат работы — сетка карточек */}
      {Array.isArray(data.formatGrid) && data.formatGrid.length > 0 && (
        <section className="block">
          <div className="block__title">Формат работы</div>
          <div className="info-grid">
            {data.formatGrid.map((it, idx) => (
              // если хочешь подсветить и эти карточки, добавь классы ниже:
              // <div key={idx} className="info-card info-card--glow u-glow">
              <div key={idx} className="info-card">
                <div className="info-card__icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 4l7 4v8l-7 4-7-4V8l7-4z"
                      stroke="currentColor"
                      opacity=".6"
                    />
                  </svg>
                </div>
                <div className="info-card__body">
                  <div className="info-card__title">{it.title}</div>
                  {it.text && <div className="info-card__text">{it.text}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Аккордеоны */}
      {Array.isArray(data.accordions) && data.accordions.length > 0 && (
        <section className="block">
          <Accordion items={data.accordions} />
        </section>
      )}

      {/* Эксклюзивы (если есть) */}
      {data.exclusives && (
        <section className="block">
          <div className="block__title">{data.exclusives.title}</div>
          <div className="exclusive exclusive--glow u-glow">
            <div className="exclusive__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l7 4v10l-7 4-7-4V7l7-4z"
                  stroke="currentColor"
                  opacity=".8"
                />
              </svg>
            </div>
            <div className="exclusive__text">
              {String(data.exclusives.text)
                .split("\n")
                .map((ln, i) => (
                  <p key={i}>{ln}</p>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Экосистема (если есть) */}
      {data.ecosystem && (
        <section className="block">
          <div className="block__title">{data.ecosystem.title}</div>
          <div className="info-grid">
            {data.ecosystem.cards.map((c, i) => (
              <div key={i} className="info-card info-card--glow u-glow">
                <div className="info-card__title">{c.title}</div>
              </div>
            ))}
          </div>
          {data.ecosystem.foot && (
            <div className="muted" style={{ marginTop: 12 }}>
              {data.ecosystem.foot}
            </div>
          )}
        </section>
      )}

      {/* Что получает клиент */}
      {Array.isArray(data.values) && data.values.length > 0 && (
        <section className="block">
          <div className="block__title">Что получает клиент</div>
          <div className="info-grid">
            {data.values.map((v, i) => (
              <div key={i} className="info-card info-card--glow u-glow">
                <div className="info-card__title">{v.title}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Тарифы */}
      <section className="block">
        <PriceTable
          tariffs={pricing.rows}
          groupPolicy={data.groupPolicy}
          note={pricing.note}
          foot={pricing.foot}
        />
      </section>
    </article>
  );
}
