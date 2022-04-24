import React from 'react';
import { Card, CardActionArea, CardHeader, CardMedia, IconButton, styled, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FileInfo } from "../../../preload/preload";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export type FileCardProps = {
  fileInfo: FileInfo;
}

export const FileCard = ({ fileInfo }: FileCardProps) => {
  const { name, path, createDate } = fileInfo;

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={path}
          alt={name}
        />
      </CardActionArea>
      <CardHeader
        sx={{ padding: 1 }}
        title={
          <Typography variant='body2'>
            {name}
          </Typography>
        }
        subheader={
          <Typography variant='caption'>
            {createDate.toDateString()}
          </Typography>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
    </StyledCard>
  );
};
