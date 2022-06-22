import React from 'react';
import { Box, styled, Typography } from "@mui/material";

const toPercentScale = (value: number) => `${(value * 100).toFixed(2)}%`;

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  border: `2px solid ${theme.palette.primary.light}`,
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: theme.palette.primary.light,
  padding: `0 5px`,
}));

const StyledTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  color: 'white',
});

export type ImageAreaHighlighterProps = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageAreaHighlighter = ({ x, y, width, height, ...meta }: ImageAreaHighlighterProps) => {
  const { age, ageCategory } = meta as { age: number, ageCategory: string };

  return (
    <>
      <StyledBox sx={{
        left: toPercentScale(x),
        top: toPercentScale(y),
        width: toPercentScale(width),
        height: toPercentScale(height),
      }} />
      <ContentBox sx={{
        left: toPercentScale(x),
        top: toPercentScale(y + height),
      }}>
        <StyledTypography>age: {age.toFixed(2)} (predicted)</StyledTypography>
        <StyledTypography>age category: {ageCategory} (inferred)</StyledTypography>
      </ContentBox>
    </>
  );
};
