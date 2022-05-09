import React from 'react';
import { Box, styled } from "@mui/material";

const toPercentScale = (value: number) => `${(value * 100).toFixed(2)}%`;

const StyledBox = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.light}`,
}));

export type ImageAreaHighlighterProps = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageAreaHighlighter = ({ x, y, width, height }: ImageAreaHighlighterProps) => {
  return (
    <StyledBox sx={{
      position: 'absolute',
      left: toPercentScale(x),
      top: toPercentScale(y),
      width: toPercentScale(width),
      height: toPercentScale(height),
    }} />
  );
};
