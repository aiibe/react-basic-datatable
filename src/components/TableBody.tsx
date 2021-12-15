import React from 'react';
import { isEvenNumber } from '../helper';
import { PropType } from '../types/TableBody';
import TableRow from './TableRow';

function TableBody({ data, showLength, page }: PropType) {
  if (!data.length)
    return (
      <tbody>
        <tr className="react-datatable__table-row--odd">
          <td valign="top" colSpan={9} style={{ textAlign: 'center' }}>
            No data available in table
          </td>
        </tr>
      </tbody>
    );

  const indexStart = showLength * (page - 1);
  const indexEnd = showLength * page;
  const items = data.slice(indexStart, indexEnd);

  return (
    <tbody>
      {items.map((item, index) => (
        <TableRow key={index} data={item} isEven={isEvenNumber(index)} />
      ))}
    </tbody>
  );
}

export default TableBody;
