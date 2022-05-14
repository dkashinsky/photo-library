import React, { useCallback, useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
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

export type PersonDialogConfirmation = {
  person: PersonDTO;
  asReference: boolean;
}

export type PersonDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (person: PersonDialogConfirmation) => void;
}

export const PersonDialog = ({ open, onClose, onConfirm }: PersonDialogProps) => {
  const dispatch = useDispatch();
  const people = useSelector(selectPeople);
  const [selected, setSelected] = useState<PersonDTO | null>(null);
  const [asRef, setAsRef] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const onCloseInner = useCallback(() => {
    setSelected(null);
    setAsRef(false);
    onClose();
  }, [onClose]);

  const onConfirmInner = useCallback(() => {
    if (selected) {
      setSelected(null);
      setAsRef(false);
      onConfirm({
        person: selected,
        asReference: asRef,
      });
    }
  }, [onClose, selected, asRef]);

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
      <form>
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
                return option.name;
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
          <FormControlLabel
            control={
              <Checkbox
                checked={asRef}
                onChange={(_, checked) => setAsRef(checked)}
              />
            }
            label="Use as reference"
            disabled={!selected}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCloseInner}
          >Cancel</Button>
          <Button
            type="submit"
            onClick={onConfirmInner}
            disabled={!selected}
          >Ok</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
