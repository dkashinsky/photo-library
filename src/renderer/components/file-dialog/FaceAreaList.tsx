import React from 'react';
import { Button, ButtonGroup, Typography } from "@mui/material";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { FaceAreaDTO } from '../../../preload/preload';
import { useSelector } from 'react-redux';
import { selectPeopleById } from '../../store/people/selectors';

export type FaceAreaListProps = {
  faceAreas: FaceAreaDTO[];
  onHover?: (faceArea: FaceAreaDTO | null) => void;
  onClick?: (faceArea: FaceAreaDTO) => void;
}

export const FaceAreaList = ({ faceAreas, onHover, onClick }: FaceAreaListProps) => {
  const peopleById = useSelector(selectPeopleById);

  if (!faceAreas.length) {
    return (
      <Typography>No faces detected</Typography>
    );
  }

  return (
    <ButtonGroup orientation="vertical">
      {faceAreas.map((faceArea, idx) => {
        const { id, personId } = faceArea;
        const displayName = personId && peopleById[personId]
          ? peopleById[personId]?.name
          : `Unknown - ${idx + 1}`;

        return (
          <Button
            key={id}
            startIcon={<TagFacesIcon />}
            onMouseEnter={() => onHover?.(faceArea)}
            onMouseLeave={() => onHover?.(null)}
            onClick={() => onClick?.(faceArea)}
          >
            {displayName}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
