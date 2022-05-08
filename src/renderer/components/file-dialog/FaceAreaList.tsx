import React from 'react';
import { Button, ButtonGroup, Typography } from "@mui/material";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { FaceAreaDTO } from '../../../preload/preload';

export type FaceAreaListProps = {
  faceAreas: FaceAreaDTO[];
}

export const FaceAreaList = ({ faceAreas }: FaceAreaListProps) => {
  if (!faceAreas.length) {
    return (
      <Typography>No faces detected</Typography>
    );
  }

  return (
    <ButtonGroup orientation="vertical">
      {faceAreas.map((faceArea, idx) => (
        <Button
          key={faceArea.id}
          startIcon={<TagFacesIcon />}
        >
          {`Unknown - ${idx + 1}`}
        </Button>
      ))}
    </ButtonGroup>
  );
};
