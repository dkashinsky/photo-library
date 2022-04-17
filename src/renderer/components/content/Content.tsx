import React from 'react';
import { CircularProgress, Paper, styled, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectLocations, selectProcessById, selectSelectedLocationId } from '../../store/locations/selectors';
import { FilesContent } from './FilesContent';

const StyledPaper = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Content = () => {
  const folders = useSelector(selectLocations);
  const selectedId = useSelector(selectSelectedLocationId);
  const processById = useSelector(selectProcessById);

  if (!folders.length) {
    return (
      <StyledPaper sx={{ flex: 1 }}>
        <Typography padding={1} textAlign="center">
          No files found. In order to start files processing add directory to scan.
        </Typography>
      </StyledPaper>
    );
  }

  if (!selectedId) {
    return (
      <StyledPaper sx={{ flex: 1 }}>
        <Typography padding={1} textAlign="center">
          Select directory to manage your files.
        </Typography>
      </StyledPaper>
    );
  }

  if (processById[selectedId]) {
    return (
      <StyledPaper sx={{ flex: 1 }}>
        <CircularProgress />
      </StyledPaper>
    )
  }

  return (
    <Paper sx={{ flex: 1 }}>
      <FilesContent folderId={selectedId} />
    </Paper>
  );
};
