import React from 'react';
import { Row } from "react-table";
import { IconButton, styled } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { RowData } from './data';

export type RowExpandButtonProps = {
  row: Row<RowData>;
};

export const RowExpandButton: React.FC<RowExpandButtonProps> = ({ row }) => {
  return (
    <IconButton
      size='small'
      {...row.getToggleRowExpandedProps()}
    >
      {row.isExpanded
        ? <ArrowDropDownIcon />
        : <ArrowRightIcon />}
    </IconButton>
  );
};

export const ExpandButtonPlaceholder = styled('span')({
  display: 'inline-block',
  width: '34px',
});
