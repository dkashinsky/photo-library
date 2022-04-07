import React, { useContext, useEffect, useState } from 'react';
import { Box, Paper, styled, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectTreeItemId } from '../store/tree-view/selectors';
import { BridgeContext } from '../bridge/bridge';

const StyledPaper = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const NodeInfo = () => {
  const bridge = useContext(BridgeContext);
  const selectedId = useSelector(selectTreeItemId);
  const [kb, setKb] = useState<string>();

  useEffect(() => {
    if (selectedId) {
      bridge?.api.readKnowledgeBase().then(setKb)
    }
  }, [bridge, selectedId]);

  return (
    <StyledPaper sx={{ flex: 1, marginTop: 1 }}>
      {kb
        ? <Typography>{kb}</Typography>
        : <Typography>No Item Selected</Typography>}
    </StyledPaper>
  );
};
