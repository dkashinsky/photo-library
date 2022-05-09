import React, { useCallback, useState } from 'react';
import { Button, ButtonProps, styled } from "@mui/material";
import { FaceAreaDTO } from '../../../preload/preload';
import { PersonDialog } from '../person-dialog/PersonDialog';

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
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(state => !state), []);

  return (
    <>
      <StyledButton onClick={toggleOpen}>
        Identify
      </StyledButton>

      <PersonDialog open={open} onClose={toggleOpen} />
    </>
  );
};
