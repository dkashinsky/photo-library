import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export type AddPersonConfirmationDialogProps = {
  name: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AddPersonConfirmationDialog = ({ name, open, onClose, onConfirm }: AddPersonConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add a new person</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to add <strong>{name}</strong> to the list?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} size='small'>Cancel</Button>
        <Button onClick={onConfirm} size='small' variant='contained'>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
