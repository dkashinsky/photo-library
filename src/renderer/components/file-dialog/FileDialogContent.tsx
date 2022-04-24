import React from 'react';
import { Card, CardMedia, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectFilesById } from '../../store/files/selectors';

export type FileDialogContent = {
  fileId: string;
}

export const FileDialogContent = ({ fileId }: FileDialogContent) => {
  const file = useSelector(selectFilesById)[fileId];

  if (!file) {
    return (
      <Typography>No file found.</Typography>
    );
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="720"
        image={file.path}
        alt={file.name}
      />
    </Card>
  );
};
