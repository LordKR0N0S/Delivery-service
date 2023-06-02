import {
  Box,
  Typography,
  useMediaQuery,
  TextField,
  Button,
  Skeleton,
  ButtonGroup,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import ComponentWrapper from './ComponentWrapper';

const libraries = ['places'];

function Maps() {
  const currentShop = useSelector((state) => state.currentShop);

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [originValue, setOriginValue] = useState(currentShop.adress);
  const [destinationValue, setDestinationValue] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const isNonMobile = useMediaQuery('(min-width:600px)');

  if (!isLoaded) {
    return (
      <Skeleton variant='text' width='100%' height={24} animation='wave' />
    );
  }

  async function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // eslint-disable-next-line no-undef
        const geocoder = new window.google.maps.Geocoder();
        // eslint-disable-next-line no-undef
        const latLng = new window.google.maps.LatLng(latitude, longitude);

        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            const address = results[0].formatted_address;
            setCurrentLocation({ lat: latitude, lng: longitude });
            setDestinationValue(address);
          } else {
            console.log('Geocoder failed');
          }
        });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  async function calculateRoute() {
    if (originValue === '' || destinationValue === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originValue,
      destination: destinationValue,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setCurrentLocation(null);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setDestinationValue('');
  }

  return (
    <Box
      p={isNonMobile ? '1rem 6% 2rem 6%' : '1rem 2%'}
      display={isNonMobileScreens ? 'flex' : 'block'}
      gap='3rem'
      justifyContent='space-between'
      sx={{
        height: '500px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: isNonMobileScreens ? '60%' : '100%',
        }}
      >
        <GoogleMap
          center={currentLocation || currentShop.coords}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {currentLocation && <Marker position={currentLocation} />}

          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <ComponentWrapper mt={isNonMobileScreens ? undefined : '2rem'}>
        <Box pt='1rem'>
          <Box mb='2rem'>
            <Autocomplete>
              <TextField
                type='text'
                label='Shop address'
                name='origin'
                onChange={(e) => setOriginValue(e.target.value)}
                defaultValue={currentShop.adress}
                sx={{ width: '100%' }}
              />
            </Autocomplete>
          </Box>
          <Box my='2rem'>
            <Autocomplete>
              <TextField
                type='text'
                label='Destination'
                name='destination'
                value={destinationValue}
                onChange={(e) => {
                  setDestinationValue(e.target.value);
                }}
                sx={{ width: '100%' }}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup variant='contained' size='small'>
            <Button
              onClick={() => {
                map.panTo(currentShop.coords);
                map.setZoom(15);
              }}
              sx={{ mr: '1px' }}
            >
              shop location
            </Button>
            <Button onClick={getCurrentLocation} sx={{ mx: '1px' }}>
              Show My Location
            </Button>
            <Button type='submit' onClick={calculateRoute} sx={{ mx: '1px' }}>
              Calculate Route
            </Button>
            <Button onClick={clearRoute} sx={{ ml: '1px' }}>
              <ClearIcon />
            </Button>
          </ButtonGroup>
        </Box>
        <Box mt={4}>
          <Typography mb='1rem'>Distance: {distance} </Typography>
          <Typography>Duration: {duration} </Typography>
        </Box>
      </ComponentWrapper>
    </Box>
  );
}

export default Maps;
