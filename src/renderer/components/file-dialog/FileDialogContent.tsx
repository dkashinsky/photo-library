import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CardMedia, CircularProgress, Divider } from "@mui/material";
import { FileInfoExtendedDTO } from '../../../preload/preload';
import { BridgeContext } from '../../bridge/bridge';
import { FaceAreaList } from './FaceAreaList';
import { DetectFacesButton } from './DetectFacesButton';

export type FileDialogContentProps = {
  fileId: string;
}

export const FileDialogContent = ({ fileId }: FileDialogContentProps) => {
  const bridge = useContext(BridgeContext);
  const [file, setFile] = useState<FileInfoExtendedDTO | null>(null);

  useEffect(() => {
    let destroyed = false;

    bridge?.api.getFile(fileId).then((file) => {
      if (!destroyed) {
        setFile(file);
      }
    });

    return () => { destroyed = true };
  }, [bridge, fileId]);

  return (
    <Card sx={{ display: 'flex', padding: 1 }}>
      {!file && (
        <CircularProgress />
      )}
      {file && (
        <>
          <CardMedia
            component="img"
            image={file.path}
            alt={file.name}
            sx={{ width: 'calc(100% - 200px)' }}
          />
          <Divider
            sx={{ ml: 1, mr: 1 }}
            orientation='vertical'
            flexItem
          />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 200,
          }}>
            {file.isProcessed
              ? <FaceAreaList faceAreas={file.faceAreas} />
              : <DetectFacesButton file={file} setFile={setFile} />}
          </Box>
        </>
      )}
    </Card >
  );
};
