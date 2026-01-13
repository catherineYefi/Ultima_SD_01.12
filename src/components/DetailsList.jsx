import React from "react";

/** очень простой парсер: **bold** -> <strong>bold</strong> */
function toHTML(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>"); // можно переносы строк в одном пункте
}

export default function DetailsList({ items, title = "Формат работы" }) {
  if (!items?.length) return null;
  return (
    <div className="block">
      <div className="block__title">{title}</div>
      <ul className="list">
        {items.map((i, idx) => (
          <li
            key={idx}
            className="list__item"
            dangerouslySetInnerHTML={{ __html: toHTML(i) }}
          />
        ))}
      </ul>
    </div>
  );
}
