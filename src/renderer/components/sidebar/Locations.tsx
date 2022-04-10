import React, { useCallback } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { DirectoryInfo } from '../../../preload/preload';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocationItem } from '../../store/locations/actions';
import { selectSelectedLocationId } from '../../store/locations/selectors';

export type LocationsProps = {
  folders: DirectoryInfo[];
}

export const Locations = ({ folders }: LocationsProps) => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectSelectedLocationId);
  const selectItem = useCallback((id: string) => {
    dispatch(selectLocationItem(id));
  }, []);

  return (
    <List dense>
      {folders.map((folder, i) => (
        <ListItem key={i} disablePadding>
          <ListItemButton
            selected={selectedId === folder.id}
            onClick={() => selectItem(folder.id)}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={folder.name}
              secondary={folder.path}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
