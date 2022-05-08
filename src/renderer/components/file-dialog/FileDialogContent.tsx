import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CircularProgress, Divider } from "@mui/material";
import { FaceAreaDTO, FileInfoExtendedDTO } from '../../../preload/preload';
import { BridgeContext } from '../../bridge/bridge';
import { FaceAreaList } from './FaceAreaList';
import { DetectFacesButton } from './DetectFacesButton';
import { ImagePane } from './ImagePane';

export type FileDialogContentProps = {
  fileId: string;
}

export const FileDialogContent = ({ fileId }: FileDialogContentProps) => {
  const bridge = useContext(BridgeContext);
  const [file, setFile] = useState<FileInfoExtendedDTO | null>(null);
  const [faceArea, setFaceArea] = useState<FaceAreaDTO | null>(null);

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
          <Box>
            <ImagePane
              imageSrc={file.path}
              highlightArea={faceArea}
            />
          </Box>
          <Divider
            sx={{ ml: 1, mr: 1 }}
            orientation='vertical'
            flexItem
          />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '0 0 200px',
          }}>
            {file.isProcessed
              ? <FaceAreaList faceAreas={file.faceAreas} onHover={setFaceArea} />
              : <DetectFacesButton file={file} setFile={setFile} />}
          </Box>
        </>
      )}
    </Card >
  );
};
