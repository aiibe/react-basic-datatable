import { ColumnType, DataType } from "../types/DataTable";

export function isEvenNumber(value: number): boolean {
  return value % 2 == 0;
}

/**
 * Function that returns transformed data with fields
 * matched to column order
 * @param data Data array (raw)
 * @param columns Columns array
 * @returns Object[] Transformed data (order ensure for table)
 */
export function matchColumnOrder(
  data: DataType[],
  columns: ColumnType[]
): DataType[] {
  const columnFields = columns.map(({ field }: ColumnType) => field);
  const newData = data.map((item: DataType) =>
    // Build new object in right order
    columnFields.reduce((obj: DataType, f: string) => {
      obj[f] = item[f];
      return obj;
    }, {})
  );

  return newData;
}

// Helpers for search

/**
 * Function to transform object to string for indexing
 * @param data Array data with objects
 * @returns string[] Array data with string
 */
export function objectToString(data: DataType[]): string[] {
  return data.map((item) => Object.values(item).join(" ").toLowerCase());
}

/**
 * Function to filter data that contains the search words given
 * @param words String search
 * @param indexedData Array of string (indexed data)
 * @param originalData Array of objects
 * @returns Object[] Array of a portion of data filtered
 */
export function searchList(
  words: string,
  indexedData: string[],
  originalData: DataType[]
) {
  // Split search text
  const arrayWords = words.trim().toLowerCase().split(" ");

  return indexedData.reduce((found: DataType[], item, index) => {
    const matched = arrayWords.map((word) =>
      item.indexOf(word) !== -1 ? 1 : 0
    );

    // Array contains 1 and only 1 is a match
    // [1,0,1] is not a matched and skipped
    if (matched.every((val) => val === 1)) {
      found.push(originalData[index]);
    }
    return found;
  }, []);
}

/**
 * Function to create array of page numbers for pagination
 * @param currentPage Number of current page
 * @param pageCount Total nomber of pages
 * @returns Array of numbers
 */
export function generatePageNumbers(
  currentPage: number,
  pageCount: number
): number[] {
  const MAX_SHOW = 7;
  const show = pageCount < MAX_SHOW ? pageCount : MAX_SHOW;
  const list = [...Array(show)];

  return list.map((_, i) => {
    const pageNum = i + 1;

    if (pageCount <= MAX_SHOW) return pageNum;

    if (pageNum === 1) return pageNum;

    if (currentPage < 5 && pageNum === 6) return 0;
    if (pageNum === show) return pageCount;

    if (currentPage >= 5 && currentPage < pageCount - 3) {
      if (pageNum === 2 || pageNum === 6) return 0;
      if (pageNum === 3) return currentPage - 1;
      if (pageNum === 4) return currentPage;
      if (pageNum === 5) return currentPage + 1;
    }

    if (currentPage >= pageCount - 3) {
      if (pageNum === 2) return 0;
      if (pageNum === 3) return pageCount - 4;
      if (pageNum === 4) return pageCount - 3;
      if (pageNum === 5) return pageCount - 2;
      if (pageNum === 6) return pageCount - 1;
    }

    return pageNum;
  });
}
