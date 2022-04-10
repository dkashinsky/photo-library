import React, { useCallback, useContext, useEffect } from 'react';
import { Box, IconButton, Paper, styled, Tooltip, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { BridgeContext } from '../../bridge/bridge';
import { NoLocationsFound } from './NoLocationsFound';
import { Locations } from './Locations';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocations } from '../../store/locations/selectors';
import { addLocationItem, receiveLocationItems } from '../../store/locations/actions';

const StyledPaper = styled(Paper)({
  display: 'flex',
  width: '300px',
});

export const Sidebar = () => {
  const bridge = useContext(BridgeContext);
  const folders = useSelector(selectLocations);
  const dispatch = useDispatch();

  const addLocation = useCallback(async () => {
    if (bridge) {
      const directory = await bridge.api.addDirectory();
      if (directory) {
        dispatch(addLocationItem(directory));
      }
    }
  }, [bridge, dispatch]);

  useEffect(() => {
    if (bridge) {
      bridge.api.getDirectories()
        .then(directories => dispatch(receiveLocationItems(directories)));
    }
  }, [bridge, dispatch]);

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
