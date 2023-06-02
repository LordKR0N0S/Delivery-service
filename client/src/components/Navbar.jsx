import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  Menu,
  Close,
  StorefrontOutlined,
  ShoppingCart,
  Description,
} from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrder = useSelector((state) => state.currentOrder);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const primaryMain = theme.palette.primary.main;

  return (
    <FlexBetween
      padding='0.75rem 6%'
      backgroundColor={alt}
      sx={{ position: 'fixed', width: '100%', zIndex: 100 }}
    >
      <FlexBetween gap='1.75rem'>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color={primaryMain}
          onClick={() => navigate('/')}
          sx={{
            '&:hover': {
              color: dark,
              cursor: 'pointer',
            },
          }}
        >
          Best Delivery
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap='2.5rem'>
          <IconButton
            onClick={() => navigate('/')}
            sx={{ gap: '0.5rem', color: dark, borderRadius: '5px' }}
          >
            <StorefrontOutlined />
            <Typography fontWeight='bold'>Shop</Typography>
          </IconButton>
          <IconButton
            onClick={() => navigate('/history')}
            sx={{ gap: '0.5rem', color: dark, borderRadius: '5px' }}
          >
            <Description />
            <Typography fontWeight='bold'>My orders</Typography>
          </IconButton>
          <Badge badgeContent={currentOrder.totalAmount} color='primary'>
            <IconButton
              onClick={() => navigate('/cart')}
              sx={{ gap: '0.5rem', color: dark, borderRadius: '5px' }}
            >
              <ShoppingCart />
              <Typography fontWeight='bold'>Cart</Typography>
            </IconButton>
          </Badge>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          sx={{ color: dark }}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              sx={{ color: dark }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <Box
            display='flex'
            flexDirection='column'
            alignItems='start'
            gap='3rem'
            pl='25%'
          >
            <IconButton
              sx={{ gap: '0.5rem', color: dark, borderRadius: '5px' }}
              onClick={() => navigate('/')}
            >
              <StorefrontOutlined />
              <Typography fontWeight='bold'>Shop</Typography>
            </IconButton>
            <Badge badgeContent={currentOrder.totalAmount} color='primary'>
              <IconButton
                onClick={() => navigate('/cart')}
                sx={{ gap: '0.5rem', color: dark, borderRadius: '5px' }}
              >
                <ShoppingCart />
                <Typography fontWeight='bold'>Cart</Typography>
              </IconButton>
            </Badge>
            <IconButton
              sx={{ gap: '0.5rem', color: dark, borderRadius: '5px' }}
              onClick={() => navigate('/history')}
            >
              <Description />
              <Typography fontWeight='bold'>My orders</Typography>
            </IconButton>
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: '25px' }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
