import React, { useCallback } from 'react';
import Button from "@mui/material/Button";
import { CellProps } from "react-table";
import { Box } from '@mui/material';
import { RowData } from './data';
import { ExpandButtonPlaceholder, RowExpandButton } from './RowExpandButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectTreeItemId } from '../store/tree-view/selectors';
import { selectTreeItem } from '../store/tree-view/actions';

export type LabelCellProps = CellProps<RowData, string>;

export const LabelCell: React.FC<LabelCellProps> = ({ value, row }) => {
  const dispatch = useDispatch();
  const { depth, children, id } = row.original;
  const isExpandable = !!children.length;
  const isSelected = useSelector(selectTreeItemId) == id;
  const handleSelect = useCallback(() => dispatch(selectTreeItem(id)), [id]);

  return (
    <Box ml={4 * depth}>
      {isExpandable
        ? <RowExpandButton row={row} />
        : <ExpandButtonPlaceholder />}
      <Button
        variant={isSelected ? 'outlined' : 'text'}
        size='small'
        onClick={handleSelect}
      >
        {value}
      </Button>
    </Box>
  );
};
