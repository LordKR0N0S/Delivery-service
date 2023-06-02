import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Modal,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { BASE_ROUTE_API } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOrder,
  removeOrder,
  resetCurrentOrder,
  resetCurrentShop,
} from '../redux/store';
import ComponentWrapper from '../components/ComponentWrapper';
import FlexBetween from '../components/FlexBetween';
import Maps from '../components/Maps.jsx';
import { Formik } from 'formik';
import * as yup from 'yup';

const orderSchema = yup.object().shape({
  address: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  phone: yup
    .string()
    .required('required')
    .matches(/^\+?\d{1,}$/gm, 'Invalid phone number'),
  name: yup.string().required('required'),
});

const initialValuesOrder = {
  name: '',
  email: '',
  address: '',
  phone: '',
};

const CartPage = () => {
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const currentOrder = useSelector((state) => state.currentOrder);
  const { orders } = currentOrder;
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const neutralMedium = palette.neutral.medium;
  const alt = palette.background.alt;
  const primaryMain = palette.primary.main;

  const handleFormSubmit = async (values, onSubmitProps) => {
    const mergedObj = { ...values, ...currentOrder };
    try {
      const response = await fetch(`${BASE_ROUTE_API}/api/v1/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedObj),
      });

      if (response.ok) {
        // const responseOrder = await response.json();
        dispatch(resetCurrentOrder());
        dispatch(resetCurrentShop());
        onSubmitProps.resetForm();
        setConfirmationPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        p={isNonMobile ? '2rem 6%' : '2rem 2%'}
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
        pt='110px'
      >
        <Box
          flexBasis={isNonMobileScreens ? '50%' : undefined}
          sx={{
            overflowY: 'scroll',
            scrollbarWidth: 'thin',
            scrollbarColor: neutralMedium,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: neutralMedium,
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: neutralMedium,
            },
          }}
          maxHeight={isNonMobileScreens ? '480px' : undefined}
        >
          <ComponentWrapper>
            <Grid container spacing={{ xs: 4, md: 3 }}>
              {currentOrder.orders.length === 0 && (
                <Typography pl='1.5rem' pt='0.5rem' variant='h6'>
                  Cart is empty
                </Typography>
              )}
              {orders.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  key={product.productId}
                  sx={{ display: 'flex' }}
                >
                  <Card
                    sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
                  >
                    <CardMedia
                      sx={{
                        width: '100%',
                        maxWidth: '200px',
                        minWidth: '150px',
                        height: isNonMobile ? '200px' : '170px',
                      }}
                      image={product.productPicturePath}
                      title='product'
                    />
                    <Box ml={isNonMobile ? '1rem' : undefined}>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          {product.productName}
                        </Typography>
                        <Typography variant='body3' color='text.secondary'>
                          {product.price} $
                        </Typography>
                      </CardContent>
                      <Box
                        display='flex'
                        alignItems='center'
                        p={2}
                        gap='1rem'
                        justify-content='end'
                      >
                        <Typography variant='h5'>{product.quantity}</Typography>
                        <IconButton
                          aria-label='Remove'
                          sx={{
                            background: primaryMain,
                            color: alt,
                            fontWeight: 'bold',
                            letterSpacing: '0.1px',
                            '&:hover': {
                              background: primaryMain,
                            },
                          }}
                          onClick={() =>
                            dispatch(removeOrder(product.productId))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          aria-label='Add'
                          sx={{
                            background: primaryMain,
                            color: alt,
                            fontWeight: 'bold',
                            letterSpacing: '0.1px',
                            '&:hover': {
                              background: primaryMain,
                            },
                          }}
                          onClick={() => dispatch(addOrder(product.productId))}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ComponentWrapper>
        </Box>
        {currentOrder.orders.length >= 1 && (
          <Box
            flexBasis={isNonMobileScreens ? '45%' : undefined}
            mt={isNonMobileScreens ? undefined : '2rem'}
          >
            <ComponentWrapper>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesOrder}
                validationSchema={orderSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display='grid'
                      gap='30px'
                      gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                      sx={{
                        '& > div': {
                          gridColumn: isNonMobile ? undefined : 'span 4',
                        },
                      }}
                    >
                      <TextField
                        label='Address'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        name='address'
                        error={
                          Boolean(touched.address) && Boolean(errors.address)
                        }
                        helperText={touched.address && errors.address}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        label='Email'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name='email'
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        label='Phone'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        name='phone'
                        error={Boolean(touched.phone) && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                        sx={{ gridColumn: 'span 4' }}
                      />
                      <TextField
                        label='Name'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name='name'
                        error={Boolean(touched.name) && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: 'span 4' }}
                      />
                    </Box>
                    <FlexBetween>
                      <Typography>
                        Total price:{' '}
                        {currentOrder.totalPrice
                          ? Number(currentOrder.totalPrice).toFixed(2)
                          : 0}{' '}
                        $
                      </Typography>
                      <Button
                        type='submit'
                        sx={{
                          m: '2rem 0',
                          p: '0.7rem  2rem',
                          fontWeight: 'bold',
                          fontSize: 16,
                          backgroundColor: palette.primary.main,
                          color: '#1E1E1E',
                          '&:hover': {
                            background: primaryMain,
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </FlexBetween>
                  </form>
                )}
              </Formik>
            </ComponentWrapper>
          </Box>
        )}
      </Box>
      <Maps />
      {confirmationPopup && (
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
              width: 335,
              bgcolor: palette.background.alt,
              boxShadow: 24,
              borderRadius: '10px',
              p: 4,
            }}
          >
            <Typography gutterBottom variant='h5' component='div'>
              Thank you for your order!
            </Typography>
            <Typography variant='body2' my='1rem'>
              The courier will contact you upon arrival.
            </Typography>
            <Box display='flex' justifyContent='end' gap='1rem'>
              <Button
                onClick={() => setConfirmationPopup(false)}
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
    </>
  );
};

export default CartPage;
