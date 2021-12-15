import React from 'react';
import { generatePageNumbers } from '../helper';
import { PropType } from '../types/Paginate';

function Paginate({ data, limit, current, setPage }: PropType) {
  if (!data.length) return null;

  const pageCount = Math.ceil(data.length / limit);
  const pageNumbers = generatePageNumbers(current, pageCount);

  const handlePrevious = () => {
    if (current > 1) return setPage(current - 1);
  };

  const handleNext = () => {
    if (current < pageCount) return setPage(current + 1);
  };

  return (
    <div>
      <button
        onClick={handlePrevious}
        disabled={current === 1}
        className="react-datatable__paginate__button"
      >
        Previous
      </button>
      {pageNumbers.map((pageNum, i) => {
        return pageNum === 0 ? (
          <span key={i} style={{ marginLeft: 5 }}>
            ...
          </span>
        ) : (
          <button
            onClick={() => setPage(pageNum)}
            key={i}
            className={`react-datatable__paginate__button ${current ===
              pageNum && `react-datatable__paginate__button--active`}`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={current === pageCount}
        className="react-datatable__paginate__button"
      >
        Next
      </button>
    </div>
  );
}

Paginate.defaultProps = {
  current: 1,
};

export default Paginate;
