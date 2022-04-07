import Box from '@mui/material/Box';
import React from 'react';
import { Provider } from 'react-redux';
import { NodeInfo } from './node-info/NodeInfo';
import store from './store/store';
import TreeViewGrid from './tree-view-grid/TreeViewGrid';
import './index.css';
import { styled } from '@mui/material';
import { BridgeProvider } from './bridge/bridge';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxSizing: 'border-box',
  padding: theme.spacing(1),
}));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BridgeProvider value={window.bridge}>
        <StyledBox>
          <TreeViewGrid />
          <NodeInfo />
        </StyledBox>
      </BridgeProvider>
    </Provider>
  );
};

export default App;
