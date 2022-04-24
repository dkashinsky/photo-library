import React, { useContext, useEffect, useState } from 'react';
import { Card, CardMedia, Typography } from "@mui/material";
import { FileInfoDTO } from '../../../preload/preload';
import { BridgeContext } from '../../bridge/bridge';

export type FileDialogContent = {
  fileId: string;
}

export const FileDialogContent = ({ fileId }: FileDialogContent) => {
  const bridge = useContext(BridgeContext);
  const [file, setFile] = useState<FileInfoDTO | null>(null);

  useEffect(() => {
    let destroyed = false;

    bridge?.api.getFile(fileId).then((file) => {
      if (!destroyed) {
        setFile(file);
      }
    });

    return () => { destroyed = true };
  }, [bridge, fileId]);

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
