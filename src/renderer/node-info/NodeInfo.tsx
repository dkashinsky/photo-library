import React from 'react';
import { Box, Paper, styled, Typography } from "@mui/material";

const StyledPaper = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NodeInfo = () => {
  return (
    <StyledPaper sx={{ flex: 1, marginTop: 1 }} >
      <Typography>No Item Selected</Typography>
    </StyledPaper>
  );
};
