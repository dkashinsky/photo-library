import React from 'react';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { DirectoryInfo } from '../../../preload/preload';

export type LocationsProps = {
  folders: DirectoryInfo[];
}

export const Locations = ({ folders }: LocationsProps) => {
  return (
    <List dense={true}>
      {folders.map((folder, i) => (
        <ListItemButton key={i}>
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
      ))}
    </List>
  );
};
