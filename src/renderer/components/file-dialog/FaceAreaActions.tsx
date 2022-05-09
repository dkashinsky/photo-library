import React, { useCallback, useState } from 'react';
import { Button, ButtonProps, styled } from "@mui/material";
import { FaceAreaDTO, PersonDTO } from '../../../preload/preload';
import { PersonDialog } from '../person-dialog/PersonDialog';
import { useDispatch } from 'react-redux';
import { linkPersonInit, unlinkPersonInit } from '../../store/people/actions';

const StyledButton = styled((props: ButtonProps) => (
  <Button
    variant='contained'
    size='small'
    {...props}
  />
))({});

export type FaceAreaActionsProps = {
  faceArea: FaceAreaDTO;
}

export const FaceAreaActions = ({ faceArea }: FaceAreaActionsProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(state => !state), []);

  const handleConfirm = useCallback((person: PersonDTO) => {
    setOpen(false);
    dispatch(linkPersonInit({
      faceAreaId: faceArea.id,
      personId: person.id,
    }));
  }, [dispatch, faceArea]);

  const handleUnlink = useCallback(() => {
    dispatch(unlinkPersonInit(faceArea.id));
  }, [dispatch, faceArea]);

  return (
    <>
      {!faceArea.personId && (
        <StyledButton onClick={toggleOpen}>
          Identify
        </StyledButton>
      )}

      {faceArea.personId && (
        <StyledButton
          variant='outlined'
          color='error'
          onClick={handleUnlink}
        >
          Unlink
        </StyledButton>
      )}


      <PersonDialog
        open={open}
        onClose={toggleOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
};
