import React from 'react';
import { useMemo, useState } from 'react';
import Paginate from './components/Paginate';
import SearchBox from './components/SearchBox';
import ShowInfo from './components/ShowInfo';
import Showing from './components/Showing';
import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import { matchColumnOrder, objectToString, searchList } from './helper';
import './index.css';
import { PropType } from './types/DataTable';

export function DataTable({ showingLength, columns, rows }: PropType) {
  const [showing, setShowing] = useState(showingLength[0]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByFieldAsc, setSortByFieldAsc] = useState<[string, boolean]>([
    columns[0].field,
    true, // ascending and false is descending
  ]);

  // Memoize data matched to columns
  const memData = useMemo(() => matchColumnOrder(rows, columns), [
    rows,
    columns,
  ]);

  // Index data for full-text search
  const indexedData = useMemo(() => objectToString(memData), [memData]);

  // Update search value and reset current page to 1
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Update showing items per page and reset to page 1
  const handleSetShowing = (number: number) => {
    setShowing(number);
    setCurrentPage(1);
  };

  // Update field to sort
  const handleFieldSort = (field: string) => {
    setSortByFieldAsc([
      field,
      field === sortByFieldAsc[0] ? !sortByFieldAsc[1] : true,
    ]);
  };

  // Filter data on search
  const data = search.length
    ? searchList(search, indexedData, memData)
    : memData;

  // Sort by field name
  const [field, ascending] = sortByFieldAsc;
  const sortData = [...data].sort((a: any, b: any) => {
    return ascending
      ? a[field].localeCompare(b[field])
      : b[field].localeCompare(a[field]);
  });

  return (
    <div className="react-datatable__wrap">
      <div className="react-datatable__sort-filter">
        <Showing
          value={showing}
          options={showingLength}
          onSelect={handleSetShowing}
        />
        <SearchBox inputChange={handleSearchChange} inputValue={search} />
      </div>

      <div className="react-datatable__table-wrap">
        <table className="react-datatable__table" role="grid">
          <TableHead
            columns={columns}
            fieldSort={handleFieldSort}
            sortBy={sortByFieldAsc}
          />
          <TableBody data={sortData} showLength={showing} page={currentPage} />
        </table>
      </div>

      <div className="react-datatable__foot">
        <ShowInfo
          showingCount={showing}
          totalCount={memData.length}
          filtering={search.length ? true : false}
          filterCount={search.length ? data.length : 0}
          currentPage={currentPage}
        />
        <Paginate
          data={sortData}
          limit={showing}
          setPage={value => setCurrentPage(value)}
          current={currentPage}
        />
      </div>
    </div>
  );
}

DataTable.defaultProps = {
  showingLength: [10, 25, 50, 100],
};
