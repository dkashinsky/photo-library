import React, { useEffect } from 'react';
import { Box, LinearProgress, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { selectFiles, selectFilesLoading } from '../../store/files/selectors';
import { getFilesInit } from '../../store/files/actions';
import { FileCard } from './FileCard';
import { selectLocationsById } from '../../store/locations/selectors';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: theme.spacing(0.5),
}))

export type FilesContentProps = {
  folderId: string;
}

export const FilesContent = ({ folderId }: FilesContentProps) => {
  const folder = useSelector(selectLocationsById)[folderId];
  const files = useSelector(selectFiles);
  const filesLoading = useSelector(selectFilesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (folder?.isProcessed) {
      dispatch(getFilesInit(folderId));
    }
  }, [folder]);

  return (
    <StyledBox>
      {filesLoading && (
        <LinearProgress sx={{ width: '100%' }} />
      )}
      {!filesLoading && files.map((item) => (
        <FileCard
          key={item.id}
          fileInfo={item}
        />
      ))}
    </StyledBox >
  );
};
