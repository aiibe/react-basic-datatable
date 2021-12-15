import { DataType } from "./DataTable";

export type PropType = {
  data: DataType[];
  limit: number;
  current: number;
  setPage: (value: number) => void;
};
