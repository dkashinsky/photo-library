import React from 'react';
import { Card, CardActionArea, CardHeader, CardMedia, IconButton, styled, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FileInfo } from "../../../preload/preload";
import { useDispatch } from 'react-redux';
import { selectFileId } from '../../store/files/actions';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export type FileCardProps = {
  fileInfo: FileInfo;
}

export const FileCard = ({ fileInfo }: FileCardProps) => {
  const dispatch = useDispatch();
  const { id, name, path, createDate } = fileInfo;
  const clickHandler = () => dispatch(selectFileId(id));

  return (
    <StyledCard>
      <CardActionArea onClick={clickHandler}>
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
