import React from 'react';
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { FaceAreaDTO } from '../../../preload/preload';
import { useSelector } from 'react-redux';
import { selectPeopleById } from '../../store/people/selectors';

export type FaceAreaListProps = {
  faceAreas: FaceAreaDTO[];
  selectedAreaId?: string | null;
  onHover?: (faceArea: FaceAreaDTO | null) => void;
  onClick?: (faceArea: FaceAreaDTO) => void;
}

export const FaceAreaList = ({ faceAreas, selectedAreaId, onHover, onClick }: FaceAreaListProps) => {
  const peopleById = useSelector(selectPeopleById);

  if (!faceAreas.length) {
    return (
      <Typography>No faces detected</Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" mb={1}>
      <Typography variant='subtitle2'>People:</Typography>
      <ButtonGroup orientation="vertical">
        {faceAreas.map((faceArea, idx) => {
          const { id, personId } = faceArea;
          const displayName = personId && peopleById[personId]
            ? peopleById[personId]?.name
            : `Unknown - ${idx + 1}`;

          return (
            <Button
              key={id}
              variant={id === selectedAreaId ? 'contained' : 'outlined'}
              startIcon={<TagFacesIcon />}
              onMouseEnter={() => onHover?.(faceArea)}
              onMouseLeave={() => onHover?.(null)}
              onClick={() => onClick?.(faceArea)}
              sx={{ justifyContent: 'flex-start' }}
            >
              {displayName}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
};
