import React, { useCallback } from 'react';
import { Box, IconButton, Paper, styled, Tooltip, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { NoLocationsFound } from './NoLocationsFound';
import { Locations } from './Locations';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocations } from '../../store/locations/selectors';
import { addLocationItemInit } from '../../store/locations/actions';

const StyledPaper = styled(Paper)({
  display: 'flex',
  width: '300px',
});

export const Sidebar = () => {
  const folders = useSelector(selectLocations);
  const dispatch = useDispatch();
  const addLocation = useCallback(() => dispatch(addLocationItemInit()), []);

  return (
    <StyledPaper sx={{ marginRight: 1 }}>
      <Box display="flex" flexDirection="column" height="100%" width="100%" p={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Locations</Typography>
          <Tooltip title="Add Location">
            <IconButton onClick={addLocation}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {folders.length
          ? (
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <Locations folders={folders} />
            </Box>
          )
          : (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NoLocationsFound />
            </Box>
          )}
      </Box>
    </StyledPaper>
  );
};
