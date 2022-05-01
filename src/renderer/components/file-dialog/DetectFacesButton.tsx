import React, { useCallback, useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { FileInfoExtendedDTO, FaceAreaDTO } from '../../../preload/preload';
import { BridgeContext } from '../../bridge/bridge';

export type DetectFacesButtonProps = {
  file: FileInfoExtendedDTO;
  setFile: (file: FileInfoExtendedDTO) => void;
}

const faceAreas: FaceAreaDTO[] = [
  { id: '1', x0: 0, x1: 50, y0: 100, y1: 150 },
  { id: '2', x0: 0, x1: 50, y0: 100, y1: 150 },
  { id: '3', x0: 0, x1: 50, y0: 100, y1: 150 },
];

export const DetectFacesButton = ({ file, setFile }: DetectFacesButtonProps) => {
  const bridge = useContext(BridgeContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const detectFaces = useCallback(() => {
    if (!isProcessing && bridge?.api) {
      setIsProcessing(true);
      bridge.api.processFile(file.id)
        .then(fileInfo => setFile({ ...fileInfo, faceAreas }))
        .finally(() => setIsProcessing(false));
    }
  }, [bridge, file.id, isProcessing]);

  return (
    <LoadingButton
      loading={isProcessing}
      loadingPosition="start"
      startIcon={<TagFacesIcon />}
      variant="contained"
      size='small'
      onClick={detectFaces}
    >
      Detect Faces
    </LoadingButton>
  );
};
