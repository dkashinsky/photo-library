import React, { useMemo, useState } from 'react';
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
  const [hoveredArea, setHoveredArea] = useState<FaceAreaDTO | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const selectedArea = useMemo(() => {
    return file?.faceAreas.find(({ id }) => id === selectedAreaId) || null;
  }, [file, selectedAreaId]);

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
              highlightArea={hoveredArea || selectedArea}
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
                  selectedAreaId={selectedAreaId}
                  onHover={setHoveredArea}
                  onClick={({ id }) => setSelectedAreaId(id)}
                />
              )
              : <DetectFacesButton fileId={fileId} />}
            {selectedArea && (
              <FaceAreaActions faceArea={selectedArea} />
            )}
          </Box>
        </>
      )}
    </Card >
  );
};
