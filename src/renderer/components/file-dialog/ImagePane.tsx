import React from 'react';
import { Box, styled } from "@mui/material";
import { ImageAreaHighlighter, ImageAreaHighlighterProps } from './ImageAreaHighlighter';

const Image = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
});

export type ImagePaneProps = {
  imageSrc: string;
  highlightArea: ImageAreaHighlighterProps | null;
}

export const ImagePane = ({ imageSrc, highlightArea }: ImagePaneProps) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Image src={imageSrc} />
      {highlightArea && (<ImageAreaHighlighter {...highlightArea} />)}
    </Box>
  );
};

