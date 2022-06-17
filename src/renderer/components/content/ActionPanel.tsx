import React from 'react';
import { Box, CircularProgress, IconButton, styled, Tooltip } from "@mui/material";
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useDispatch, useSelector } from 'react-redux';
import { recognizeFilesInit } from '../../store/locations/actions';
import { selectRecognitionById } from '../../store/locations/selectors';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'flex-start',
}));

export type ActionPanelProps = {
  folderId: string;
}

export const ActionPanel = ({ folderId }: ActionPanelProps) => {
  const dispatch = useDispatch();
  const isRecognizing = useSelector(selectRecognitionById)[folderId];

  return (
    <StyledBox>
      <Tooltip title="Start Recognition">
        <IconButton
          color='primary'
          onClick={() => dispatch(recognizeFilesInit(folderId))}
          disabled={isRecognizing}
        >
          {isRecognizing
            ? <CircularProgress size={24} />
            : <TagFacesIcon />}
        </IconButton>
      </Tooltip>
    </StyledBox>
  );
};
