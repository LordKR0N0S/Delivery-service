import { Box, useMediaQuery } from '@mui/material';
import SideBar from '../components/SideBar';
import ProductGrid from '../components/ProductGrid';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  return (
    <Box
      width='100%'
      padding='2rem 6%'
      display={isNonMobileScreens ? 'flex' : 'block'}
      gap='0.5rem'
      justifyContent='space-between'
      pt='110px'
    >
      <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
        <SideBar />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? '68%' : undefined}
        mt={isNonMobileScreens ? undefined : '2rem'}
      >
        <ProductGrid />
      </Box>
    </Box>
  );
};

export default HomePage;
