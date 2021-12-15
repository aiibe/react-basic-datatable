import React from 'react';
import { PropType } from '../types/TableRow';

function TableRow({ data, isEven }: PropType) {
  return (
    <tr
      role="row"
      className={
        isEven
          ? 'react-datatable__table-row--even'
          : 'react-datatable__table-row'
      }
    >
      {Object.values(data).map((value: any) => (
        <td key={value}>{value}</td>
      ))}
    </tr>
  );
}

export default TableRow;
