import React, { useCallback, useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { selectPeople } from '../../store/people/selectors';
import { PersonDTO } from '../../../preload/preload';
import { addPersonInit } from '../../store/people/actions';

type PersonOptionTemplate = {
  input: string;
  name: string;
}

type PersonOption = PersonDTO | PersonOptionTemplate;

const filter = createFilterOptions<PersonOption>();
const isTemplate = (option: PersonOption): option is PersonOptionTemplate => {
  return Object.hasOwn(option, 'input');
};

export type PersonDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (person: PersonDTO) => void;
}

export const PersonDialog = ({ open, onClose, onConfirm }: PersonDialogProps) => {
  const dispatch = useDispatch();
  const people = useSelector(selectPeople);
  const [selected, setSelected] = useState<PersonDTO | null>(null);
  const [input, setInput] = useState<string>('');

  const onCloseInner = useCallback(() => {
    setSelected(null);
    onClose();
  }, [onClose]);

  const onConfirmInner = useCallback(() => {
    if (selected) {
      setSelected(null);
      onConfirm(selected);
    }
  }, [onClose, selected]);

  // TODO: Find a better way to set newly added person
  useEffect(() => {
    if (input) {
      const person = people.find(({ name }) => name === input);

      if (person) {
        setSelected(person);
      }
    }
  }, [people])

  return (
    <Dialog
      open={open}
      onClose={onCloseInner}
    >
      <DialogContent>
        <Autocomplete
          value={selected}
          onChange={(_, newValue) => {
            if (typeof newValue === 'string') {
              dispatch(addPersonInit(newValue));
              setInput(newValue);
            } else if (newValue && isTemplate(newValue)) {
              dispatch(addPersonInit(newValue.input));
              setInput(newValue.input);
            } else {
              setSelected(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                input: params.inputValue,
                name: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          options={people as PersonOption[]}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (isTemplate(option)) {
              return option.input;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              label="Start typing to select person or add new"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseInner}>Cancel</Button>
        <Button onClick={onConfirmInner} disabled={!selected}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};
