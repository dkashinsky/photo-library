export interface ElectronBridge {
  versions: {
    chrome: string;
    node: string;
    electron: string;
  }
  api: {
    readKnowledgeBase: () => Promise<string>;
  }
}

declare global {
  interface Window {
    // can be undefined in non electron environment
    bridge?: ElectronBridge;
  }
}
