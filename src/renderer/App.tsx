import Box from '@mui/material/Box';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import { styled } from '@mui/material';
import { BridgeProvider } from './bridge/bridge';
import { Sidebar } from './components/sidebar/Sidebar';
import { Content } from './components/content/Content';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  boxSizing: 'border-box',
  padding: theme.spacing(1),
  height: '100%',
}));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BridgeProvider value={window.bridge}>
        <StyledBox>
          <Sidebar />
          <Content />
        </StyledBox>
      </BridgeProvider>
    </Provider>
  );
};

export default App;
