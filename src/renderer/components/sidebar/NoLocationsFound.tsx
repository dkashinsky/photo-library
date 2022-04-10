import React from 'react';
import { Typography } from "@mui/material";

export const NoLocationsFound = () => {
  return (
    <Typography padding={1} textAlign="center">
      No Locations found. In order to start files processing add directory to scan.
    </Typography>
  );
};
