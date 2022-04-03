import React, { useCallback, useState } from 'react';

const App: React.FC = () => {
  const { versions, fs } = window.bridge ?? {};
  const { node, chrome, electron } = versions ?? {};

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const handleClick = useCallback(() => {
    if (!isLoading && fs) {
      setIsLoading(true);
      fs.readCurrentFolder()
        .then((files) => setFiles(files))
        .finally(() => setIsLoading(false))
    }
  }, [isLoading, fs]);


  return (
    <>
      <h1>Hello World!</h1>
      <p>
        We are using Node.js <span id="node-version">{node}</span>,
        Chromium <span id="chrome-version">{chrome}</span>,
        and Electron <span id="electron-version">{electron}</span>.
      </p>
      <button
        onClick={handleClick}
        disabled={isLoading}
      >
        Show current app folder
      </button>
      {!!files.length && (
        <ul>
          {files.map(file => <li>{file}</li>)}
        </ul>
      )}
    </>
  );
};

export default App;
