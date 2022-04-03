import {
  Row,
  UseExpandedRowProps,
} from "react-table";

declare module 'react-table' {
  export interface Row<D = {}> extends UseExpandedRowProps<D> { }
}
