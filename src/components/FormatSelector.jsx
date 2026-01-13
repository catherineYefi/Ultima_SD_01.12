import React from 'react'
import Tabs from './Tabs.jsx'

export default function FormatSelector({ tabs, activeId, onChange }) {
  return (
    <div className="format-selector">
      <Tabs tabs={tabs} activeId={activeId} onChange={onChange} />
    </div>
  )
}
