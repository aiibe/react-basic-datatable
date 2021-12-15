import React from 'react';
import { ColumnType } from '../types/DataTable';
import { PropType } from '../types/TableHead';
import Arrows from './Arrows';

function TableHead({
  columns,
  fieldSort,
  sortBy: [currentField, ascending],
}: PropType) {
  return (
    <thead>
      <tr role="row">
        {columns.map(({ label, field }: ColumnType) => (
          <th
            key={field}
            tabIndex={0}
            onKeyPress={({ key }) => key === 'Enter' && fieldSort(field)}
            onClick={() => fieldSort(field)}
            aria-sort={
              field === currentField
                ? ascending
                  ? 'ascending'
                  : 'descending'
                : 'ascending'
            }
            className="react-datatable__head-field"
            aria-label={`${label}: activate to sort column ${
              field === currentField
                ? ascending
                  ? 'descending'
                  : 'ascending'
                : 'ascending'
            }`}
          >
            <span>{label}</span>
            <Arrows active={currentField === field} ascending={ascending} />
          </th>
        ))}
      </tr>
    </thead>
  );
}
export default TableHead;
