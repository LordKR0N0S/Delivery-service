import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Modal,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BASE_ROUTE_API } from '../constants';
import { setShops, setCurrentShop } from '../redux/store';
import ComponentWrapper from './ComponentWrapper';
import FlexBetween from './FlexBetween';

const SideBar = () => {
  const [shopsData, setShopsData] = useState([]);
  const [warningPopup, setWarningPopup] = useState(false);
  const currentShop = useSelector((state) => state.currentShop);
  const currentOrder = useSelector((state) => state.currentOrder);
  const dispatch = useDispatch();

  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { palette } = useTheme();
  const light = palette.neutral.light;

  const getShops = async () => {
    try {
      const response = await fetch(`${BASE_ROUTE_API}/api/v1/shops`, {
        method: 'GET',
      });

      const shops = await response.json();

      setShopsData(shops);
      dispatch(setShops({ shops }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShops();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const chooseAnotherShop = (shop) => {
    if (!currentOrder.totalAmount) {
      dispatch(setCurrentShop({ shop }));
    } else {
      if (shop.shopName === currentShop.shopName) return;
      setWarningPopup(true);
    }
  };

  return (
    <ComponentWrapper>
      <Box
        display='flex'
        flexDirection={isNonMobileScreens ? 'column' : 'row'}
        gap='1rem'
        justifyContent='center'
      >
        {shopsData.map((shop) => (
          <Box key={shop._id}>
            <FlexBetween
              p='1rem'
              flexDirection={isNonMobileScreens ? 'row' : 'column-reverse'}
              sx={{
                textAlign: 'center',
                borderRadius: '5px',
                background:
                  shop.shopName === currentShop.shopName ? light : null,
                transition: 'all 0.3s ease-out',
                '&:hover': {
                  background: light,
                  cursor: 'pointer',
                },
              }}
              onClick={() => chooseAnotherShop(shop)}
            >
              <Typography fontWeight='bold'>{shop.shopName}</Typography>
              <Box>
                <img
                  src={shop.shopPicturePath}
                  alt='shopIcon'
                  style={{ width: '40px', height: '40px' }}
                />
              </Box>
            </FlexBetween>
            {isNonMobileScreens ? <Divider /> : null}
          </Box>
        ))}
      </Box>
      {warningPopup && (
        <Modal
          open={true}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 385,
              bgcolor: palette.background.alt,
              boxShadow: 24,
              borderRadius: '10px',
              p: 4,
            }}
          >
            <Typography gutterBottom variant='h5' component='div'>
              Warning!
            </Typography>
            <Typography variant='body2' my='1rem'>
              You currently have items in your cart from another shop.
            </Typography>
            <Box display='flex' justifyContent='end' gap='1rem'>
              <Button
                onClick={() => setWarningPopup(false)}
                sx={{
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  '&:hover': { color: palette.primary.main },
                }}
              >
                Ok
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </ComponentWrapper>
  );
};

export default SideBar;
