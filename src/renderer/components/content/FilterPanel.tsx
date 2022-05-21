import React from 'react';
import { DesktopDatePicker } from "@mui/lab";
import { Box, styled, TextField } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { selectEndDateFilter, selectStartDateFilter } from '../../store/files/selectors';
import { setEndDateFilter, setStartDateFilter } from '../../store/files/actions';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'flex-start',
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(1),
  maxWidth: '160px',
  minWidth: '125px',
}));

export const FilterPanel = () => {
  const dispatch = useDispatch();
  const startDate = useSelector(selectStartDateFilter);
  const endDate = useSelector(selectEndDateFilter);

  return (
    <StyledBox>
      <DesktopDatePicker
        label="Start Date"
        inputFormat="dd/MM/yyyy"
        value={startDate}
        onChange={(date) => dispatch(setStartDateFilter(date))}
        renderInput={(params) => <StyledInput size='small' {...params} />}
      />
      <DesktopDatePicker
        label="End Date"
        inputFormat="dd/MM/yyyy"
        value={endDate}
        onChange={(date) => dispatch(setEndDateFilter(date))}
        renderInput={(params) => <StyledInput size='small' {...params} />}
      />
    </StyledBox>
  );
};
