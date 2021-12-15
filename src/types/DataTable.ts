export type PropType = {
  showingLength: number[];
  columns: ColumnType[];
  rows: DataType[];
};

export type DataType = {
  [key: string]: string | number;
};

export type ColumnType = {
  label: string;
  field: string;
};
