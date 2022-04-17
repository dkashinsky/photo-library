import React, { useEffect } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { selectFiles, selectFilesLoading } from '../../store/files/selectors';
import { getFilesInit } from '../../store/files/actions';

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
    <Box p={1} sx={{ maxHeight: '100%', overflow: 'auto' }}>
      <ImageList sx={{ height: '100%' }}>
        {files.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item.path}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={<span>at: {item.createDate}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box >
  );
};
