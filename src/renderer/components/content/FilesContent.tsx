import React, { useEffect } from 'react';
import { Box, LinearProgress, styled } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEndDateFilter,
  selectFiles,
  selectFilesLoading,
  selectStartDateFilter,
} from '../../store/files/selectors';
import { getFilesInit } from '../../store/files/actions';
import { FileCard } from './FileCard';
import { selectLocationsById } from '../../store/locations/selectors';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: theme.spacing(0.5),
  overflow: 'auto',
}))

export type FilesContentProps = {
  folderId: string;
}

export const FilesContent = ({ folderId }: FilesContentProps) => {
  const folder = useSelector(selectLocationsById)[folderId];
  const startDate = useSelector(selectStartDateFilter);
  const endDate = useSelector(selectEndDateFilter);
  const files = useSelector(selectFiles);
  const filesLoading = useSelector(selectFilesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (folder?.isProcessed) {
      dispatch(getFilesInit({
        directoryId: folder.id,
        startDate,
        endDate,
      }));
    }
  }, [folder, startDate, endDate]);

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
