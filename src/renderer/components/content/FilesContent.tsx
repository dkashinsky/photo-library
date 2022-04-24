import React, { useEffect } from 'react';
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { selectFiles, selectFilesLoading } from '../../store/files/selectors';
import { getFilesInit } from '../../store/files/actions';
import { FileCard } from './FileCard';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: theme.spacing(0.5),
}))

export type FilesContentProps = {
  folderId: string;
}

export const FilesContent = ({ folderId }: FilesContentProps) => {
  const files = useSelector(selectFiles);
  const loading = useSelector(selectFilesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!files.length && !loading) {
      dispatch(getFilesInit(folderId));
    }
  }, [folderId, files, loading]);

  return (
    <StyledBox>
      {files.map((item) => (
        <FileCard
          key={item.id}
          fileInfo={item}
        />
      ))}
    </StyledBox >
  );
};
