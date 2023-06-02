import {
  Box,
  Typography,
  useMediaQuery,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { BASE_ROUTE_API } from '../constants';
import ComponentWrapper from '../components/ComponentWrapper';
import { convertToNormalFormat } from '../utils';

const HistoryPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isNonMobile = useMediaQuery('(min-width:700px)');

  const getOrders = async () => {
    try {
      const response = await fetch(`${BASE_ROUTE_API}/api/v1/order`, {
        method: 'GET',
      });

      const orders = await response.json();

      setOrdersData(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      return (
        (email === '' ||
          order.email.toLowerCase().includes(email.toLowerCase())) &&
        (phone === '' ||
          order.phone.toLowerCase().includes(phone.toLowerCase()))
      );
    });
  }, [email, phone, ordersData]);

  return (
    <Box
      p={isNonMobile ? '2rem 6%' : '2rem 2%'}
      gap='0.5rem'
      justifyContent='space-between'
      pt='110px'
    >
      <ComponentWrapper>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Box minWidth='20rem'>
            <TextField
              type='text'
              label='Email:'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box mt='1.5rem' mb='1rem' minWidth='20rem'>
            <TextField
              type='text'
              label='Phone:'
              name='phone'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              sx={{ width: '100%' }}
            />
          </Box>
        </Box>
      </ComponentWrapper>
      {filteredOrders.map((el) => (
        <ComponentWrapper
          key={el._id}
          mt='1rem'
          display={isNonMobile ? 'flex' : 'block'}
        >
          <Box maxWidth={isNonMobile ? '50%' : '100%'}>
            <Grid container spacing={{ xs: 4, md: 3 }}>
              {el.orders.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  key={product.productId}
                >
                  <Card
                    sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
                  >
                    <CardMedia
                      sx={{
                        width: '6rem',
                        height: '6rem',
                      }}
                      image={product.productPicturePath}
                      title='product'
                    />
                    <CardContent sx={{ p: '2px', mb: '-5px', mt: '5px' }}>
                      <Box ml='1rem'>
                        <Typography
                          gutterBottom
                          variant='body1'
                          component='div'
                        >
                          {product.productName}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {product.price} $
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          x{product.quantity}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            ml={isNonMobile ? '5rem' : undefined}
            mt={isNonMobile ? undefined : '0.5rem'}
          >
            <Box>
              <Typography p='5px' variant='h6'>
                {el.shopName}
              </Typography>
              <Typography p='5px' variant='body2' color='text.secondary'>
                {el.totalPrice} $
              </Typography>
              <Typography p='5px' variant='body2' color='text.secondary'>
                {convertToNormalFormat(el.createdAt)}
              </Typography>
              <Typography p='5px' variant='body2' color='text.secondary'>
                {el.email}
              </Typography>
              <Typography p='5px' variant='body2' color='text.secondary'>
                {el.phone}
              </Typography>
              <Typography p='5px' variant='body2' color='text.secondary'>
                {el.address}
              </Typography>
            </Box>
          </Box>
        </ComponentWrapper>
      ))}
    </Box>
  );
};

export default HistoryPage;
