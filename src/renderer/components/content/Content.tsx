import React from 'react';
import { Paper, styled, Typography } from "@mui/material";

const StyledPaper = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Content = () => {
  return (
    <StyledPaper sx={{ flex: 1 }}>
      <Typography>No files found. In order to start files processing add directory to scan.</Typography>
    </StyledPaper>
  );
};
