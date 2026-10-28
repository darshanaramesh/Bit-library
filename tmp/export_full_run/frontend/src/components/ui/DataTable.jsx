import { EmptyState } from './Card';

/**
 * DataTable – generic table used by dashboards and management pages.
 * columns: [{ key, label, render?(row), width?, wrap?, num? }]
 *  - wrap: let a long-text cell wrap instead of staying on one line
 *  - num : right-align and tabulate a numeric column
 * The wrapper scrolls horizontally (with an edge fade) instead of squeezing
 * or breaking the layout on narrow screens.
 */
export default function DataTable({
  columns,
  rows,
  keyAccessor = 'id',
  emptyTitle = 'No records found',
  emptyText = 'There is nothing to show here yet.',
}) {
  const cellClass = (col) =>
    [col.wrap ? 'wrap' : '', col.num ? 'num' : ''].filter(Boolean).join(' ');

  return (
    <div className="table-wrap table-scroll thin-scroll">
      <table className="table">
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cellClass(col) || undefined}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 0 }}>
                <EmptyState title={emptyTitle} text={emptyText} />
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row[keyAccessor]}>
                {columns.map((col) => (
                  <td key={col.key} className={cellClass(col) || undefined}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
