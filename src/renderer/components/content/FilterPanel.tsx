import React, { useMemo } from 'react';
import { DesktopDatePicker } from "@mui/lab";
import { Autocomplete, Box, Checkbox, styled, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { selectEndDateFilter, selectPeopleFilter, selectStartDateFilter } from '../../store/files/selectors';
import { setEndDateFilter, setPeopleFilter, setStartDateFilter } from '../../store/files/actions';
import { selectPeople } from '../../store/people/selectors';

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FilterPanel = () => {
  const dispatch = useDispatch();
  const startDate = useSelector(selectStartDateFilter);
  const endDate = useSelector(selectEndDateFilter);
  const allPeople = useSelector(selectPeople);
  const selectedPeople = useSelector(selectPeopleFilter);

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
      <Autocomplete
        size='small'
        fullWidth
        multiple
        options={allPeople}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="People" placeholder="Select..." />
        )}
        value={selectedPeople}
        onChange={(_, selection) => dispatch(setPeopleFilter(selection.map(({ id }) => id)))}
      />
    </StyledBox>
  );
};
