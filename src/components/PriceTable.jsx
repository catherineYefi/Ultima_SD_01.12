import React from "react";

function formatPrice(n) {
  if (typeof n !== "number") return n;
  const num = n
    .toLocaleString("ru-RU", { maximumFractionDigits: 0 })
    .replace(/\u00A0/g, " ");
  return `${num}\u00A0₽`;
}
function renderGroup(policy, row) {
  if (!policy || policy.mode === "none") return "—";
  if (policy.mode === "fixed") return policy.value || "—";
  if (policy.mode === "size")
    return typeof row.groupSize === "number"
      ? `Группа ${row.groupSize} чел.`
      : "—";
  return "—";
}

export default function PriceTable({ tariffs = [], groupPolicy, note, foot }) {
  if (!tariffs.length) return null;
  return (
    <div className="block">
      <div className="block__title">Тарифы</div>

      <table className="u-price-table" role="table">
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Тариф</th>
            <th>Группа</th>
            <th className="u-col-price">Цена</th>
          </tr>
        </thead>
        <tbody>
          {tariffs.map((t, i) => (
            <tr key={i}>
              <td
                title={
                  t.name.includes("Трекер ядра ULTIMA")
                    ? "отобран и обучен Михаилом Дашкиевым"
                    : undefined
                }
              >
                {t.name}
              </td>
              <td className="u-td-muted">{renderGroup(groupPolicy, t)}</td>
              <td className="u-col-price u-td-price">{formatPrice(t.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {note && <div className="price-table__hint">{note}</div>}
      {foot && <div className="price-footnote">{foot}</div>}
    </div>
  );
}
