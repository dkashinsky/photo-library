import React, { useState } from 'react';
import { Box, Card, CircularProgress, Divider } from "@mui/material";
import { FaceAreaDTO } from '../../../preload/preload';
import { FaceAreaList } from './FaceAreaList';
import { DetectFacesButton } from './DetectFacesButton';
import { ImagePane } from './ImagePane';
import { useSelector } from 'react-redux';
import { selectExtendedFilesById } from '../../store/files/selectors';
import { FaceAreaActions } from './FaceAreaActions';

export type FileDialogContentProps = {
  fileId: string;
}

export const FileDialogContent = ({ fileId }: FileDialogContentProps) => {
  const file = useSelector(selectExtendedFilesById)[fileId];
  const [faceArea, setFaceArea] = useState<FaceAreaDTO | null>(null);
  const [selected, setSelected] = useState<FaceAreaDTO | null>(null);

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
              highlightArea={faceArea || selected}
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
              ? (
                <FaceAreaList
                  faceAreas={file.faceAreas}
                  onHover={setFaceArea}
                  onClick={setSelected}
                />
              )
              : <DetectFacesButton fileId={fileId} />}
            {selected && (
              <FaceAreaActions faceArea={selected} />
            )}
          </Box>
        </>
      )}
    </Card >
  );
};
