import React from 'react';
import { Avatar, CircularProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { DirectoryInfo } from '../../../preload/preload';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocationItem } from '../../store/locations/actions';
import { selectProcessById, selectSelectedLocationId } from '../../store/locations/selectors';

export type LocationsProps = {
  folders: DirectoryInfo[];
}

export const Locations = ({ folders }: LocationsProps) => {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectSelectedLocationId);
  const processById = useSelector(selectProcessById);

  return (
    <List dense>
      {folders.map((folder, i) => (
        <ListItem key={i} disablePadding>
          <ListItemButton
            selected={selectedId === folder.id}
            onClick={() => dispatch(selectLocationItem(folder.id))}
          >
            <ListItemAvatar>
              <Avatar>
                {processById[folder.id]
                  ? <CircularProgress color="inherit" size={24} />
                  : <FolderIcon color={folder.isProcessed ? "info" : "disabled"} />}
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
