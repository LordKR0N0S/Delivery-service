import { Box } from '@mui/material';
import { styled } from '@mui/system';

const ComponentWrapper = styled(Box)(({ theme }) => ({
  padding: '2rem 1.5rem 1rem 1.5rem',
  backgroundColor: theme.palette.background.alt,
  borderRadius: '0.75rem',
}));

export default ComponentWrapper;
