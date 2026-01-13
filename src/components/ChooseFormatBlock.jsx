import React from 'react'
import { chooseFormat } from '../data/formats.js'

export default function ChooseFormatBlock() {
  if (!chooseFormat?.length) return null
  return (
    <div className="choose">
      <h3 className="choose__title">Как выбрать формат?</h3>
      <div className="choose__table" role="table">
        <div className="choose__header" role="row">
          <div className="choose__cell choose__cell--head">Ситуация</div>
          <div className="choose__cell choose__cell--head">Рекомендованный формат</div>
        </div>
        {chooseFormat.map((row, i) => (
          <div className="choose__row" role="row" key={i}>
            <div className="choose__cell" role="cell">{row.situation}</div>
            <div className="choose__cell" role="cell">{row.format}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
