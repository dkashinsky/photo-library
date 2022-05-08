import React from 'react';
import { LoadingButton } from '@mui/lab';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useDispatch, useSelector } from 'react-redux';
import { selectProcessingById } from '../../store/files/selectors';
import { processFileInit } from '../../store/files/actions';

export type DetectFacesButtonProps = {
  fileId: string;
}

export const DetectFacesButton = ({ fileId }: DetectFacesButtonProps) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector(selectProcessingById)[fileId];
  const detectFaces = () => dispatch(processFileInit(fileId));

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
