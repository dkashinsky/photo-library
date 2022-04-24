import React from 'react';
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectFileId } from "../../store/files/actions";
import { selectSelectedFileId } from "../../store/files/selectors";
import { FileDialogContent } from './FileDialogContent';

export const FileDialog = () => {
  const dispatch = useDispatch();
  const selectedFileId = useSelector(selectSelectedFileId);
  const handleClose = () => dispatch(selectFileId(null));

  return (
    <Dialog
      open={!!selectedFileId}
      onClose={handleClose}
      maxWidth={false}
    >
      {selectedFileId && (
        <FileDialogContent fileId={selectedFileId} />
      )}
    </Dialog>
  );
};
