import React from 'react';
import { PropType } from '../types/ShowInfo';

function ShowInfo({
  totalCount,
  showingCount,
  filterCount,
  currentPage,
  filtering,
}: PropType) {
  const base = filtering ? filterCount : totalCount;
  const start = base === 0 ? base : showingCount * (currentPage - 1) + 1;
  const end = showingCount * currentPage;
  const endLimit = base < end ? base : end;

  return (
    <div role="status" aria-live="polite">
      Showing {start} to {endLimit} of {base} entries{' '}
      {filtering && `(filtered from ${totalCount} total entries)`}
    </div>
  );
}

ShowInfo.defaultProps = {
  totalCount: 0,
  showingCount: 0,
  currentPage: 1,
  filterCount: 0,
  filtering: false,
};

export default ShowInfo;
