import { createContext } from 'react';
import { ElectronBridge } from '../../preload/preload';

export const BridgeContext = createContext<ElectronBridge | undefined>(undefined);
export const BridgeProvider = BridgeContext.Provider;
