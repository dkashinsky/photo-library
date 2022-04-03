import React from 'react';
import Button from "@mui/material/Button";
import { CellProps } from "react-table";
import { Box } from '@mui/material';
import { RowData } from './data';
import { ExpandButtonPlaceholder, RowExpandButton } from './RowExpandButton';

export type LabelCellProps = CellProps<RowData, string>;

export const LabelCell: React.FC<LabelCellProps> = ({ value, row }) => {
  const { depth, children } = row.original;
  const isExpandable = !!children.length;

  return (
    <Box ml={4 * depth}>
      {isExpandable
        ? <RowExpandButton row={row} />
        : <ExpandButtonPlaceholder />}
      <Button size='small'>
        {value}
      </Button>
    </Box>
  );
};
