import { ColumnType } from "./DataTable";

export type PropType = {
  columns: ColumnType[];
  fieldSort: (field: string) => void;
  sortBy: [string, boolean];
};
