import React from 'react';

export default function ManageTable({ title, active, onClick, children }) {
  return (
    <div className={`manage-table ${active ? "active" : ""}`}>
      <div className="header-table" onClick={onClick}>
        {title}
      </div>
      <div className="body-table">
        {children}
      </div>
    </div>
  );
}
