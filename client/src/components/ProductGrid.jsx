import {
  Box,
  Typography,
  useTheme,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrder } from '../redux/store';
import ComponentWrapper from './ComponentWrapper';

const ProductGrid = () => {
  const currentShop = useSelector((state) => state.currentShop);
  const { goods } = currentShop;
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const alt = palette.background.alt;
  const primaryMain = palette.primary.main;

  return (
    goods && (
      <ComponentWrapper sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 4, md: 3 }} sx={{ maxWidth: '100%' }}>
          {goods.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              key={product.productId}
              sx={{ display: 'flex' }}
            >
              <Card
                sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
              >
                <CardMedia
                  sx={{ width: '100%', height: '200px' }}
                  image={product.productPicturePath}
                  title='product'
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='div'>
                    {product.productName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {product.description}
                  </Typography>
                </CardContent>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  p={2}
                >
                  <Typography variant='body3' color='text.secondary'>
                    {product.price} $
                  </Typography>
                  <Button
                    size='medium'
                    sx={{
                      background: primaryMain,
                      color: alt,
                      fontWeight: 'bold',
                      letterSpacing: '0.1px',
                      '&:hover': {
                        background: primaryMain,
                      },
                    }}
                    onClick={() => dispatch(setCurrentOrder(product))}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ComponentWrapper>
    )
  );
};

export default ProductGrid;
