import Box from '@mui/material/Box';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import TreeViewGrid from './tree-view-grid/TreeViewGrid';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Box>
        <TreeViewGrid />
      </Box>
    </Provider>
  );
};

export default App;
