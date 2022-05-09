import React from 'react';
import { Button, ButtonGroup, Typography } from "@mui/material";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { FaceAreaDTO } from '../../../preload/preload';
import { useDispatch } from 'react-redux';

export type FaceAreaListProps = {
  faceAreas: FaceAreaDTO[];
  onHover?: (faceArea: FaceAreaDTO | null) => void;
  onClick?: (faceArea: FaceAreaDTO) => void;
}

export const FaceAreaList = ({ faceAreas, onHover, onClick }: FaceAreaListProps) => {
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
          onMouseEnter={() => onHover?.(faceArea)}
          onMouseLeave={() => onHover?.(null)}
          onClick={() => onClick?.(faceArea)}
        >
          {`Unknown - ${idx + 1}`}
        </Button>
      ))}
    </ButtonGroup>
  );
};
