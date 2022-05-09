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
import { AddPersonConfirmationDialog } from './AddPersonConfirmationDialog';
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
}

export const PersonDialog = ({ open, onClose }: PersonDialogProps) => {
  const dispatch = useDispatch();
  const people = useSelector(selectPeople);
  const [selected, setSelected] = useState<PersonDTO | null>(null);

  const [confirmation, setConfirmation] = useState({ open: false, input: '' });
  const closeConfirmation = () => setConfirmation(state => ({ ...state, open: false }));
  const handleConfirmation = () => {
    dispatch(addPersonInit(confirmation.input))
    closeConfirmation();
  };

  // TODO: Find a better way to set newly added person
  useEffect(() => {
    if (confirmation.input) {
      const person = people.find(({ name }) => name === confirmation.input);
      if (person) {
        setSelected(person);
      }
    }
  }, [people])

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogContent>
          <Autocomplete
            value={selected}
            onChange={(_, newValue) => {
              if (typeof newValue === 'string') {
                setConfirmation({ open: true, input: newValue });
              } else if (newValue && isTemplate(newValue)) {
                setConfirmation({ open: true, input: newValue.input });
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
                label="Start typing to select person or add new"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button>Ok</Button>
        </DialogActions>
      </Dialog>

      <AddPersonConfirmationDialog
        name={confirmation.input}
        open={confirmation.open}
        onClose={closeConfirmation}
        onConfirm={handleConfirmation}
      />
    </>
  );
};
