import React from "react";

export function Table({ columns, rows, rowKey = "id", className = "" }) {
  return (
    <div className={`d4-table-wrap ${className}`.trim()}>
      <table className="d4-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row[rowKey] ?? rowIndex}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
