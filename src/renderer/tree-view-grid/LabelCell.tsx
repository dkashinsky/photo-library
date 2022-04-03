import React from 'react';
import Button from "@mui/material/Button";
import { CellProps } from "react-table";
import { RowData } from "./types";
import { Box, IconButton } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export type LabelCellProps = CellProps<RowData, string>;

export const LabelCell: React.FC<LabelCellProps> = ({ value, row }) => {
  return (
    <Box>
      <IconButton
        size='small'
        {...row.getToggleRowExpandedProps()}
      >
        {row.isExpanded
          ? <ArrowDropDownIcon />
          : <ArrowRightIcon />}
      </IconButton>
      <Button size='small'>
        {value}
      </Button>
    </Box>
  );
};
