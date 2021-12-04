import { Box, Container, Heading, SimpleGrid, Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Spinner } from '@chakra-ui/spinner';
import React, { useEffect, useState } from 'react';
import { getPlaces } from '../api/apiRequest';
import { Place } from '../types';
import PlacesList from './PlacesList';

const getCurrentUserLocation = (): Promise<string | any> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        resolve(`${latitude},${longitude}`);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const GetPlaces: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [sortingMethod, setSortingMethod] = useState<string>('DISTANCE');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const handleError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('Kindly grant access for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setError('The request to get user location timed out.');
        break;
    }
  };

  const getPlacesByUserLocation = async () => {
    try {
      setLoading(true);
      const latLong = await getCurrentUserLocation();
      const places = await getPlaces(latLong, sortingMethod);
      setPlaces(places);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      getPlacesByUserLocation();
    }
  }, [sortingMethod]);

  if (loading) {
    return (
      <Container maxW="xl" centerContent>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxW="xl" centerContent>
        <Heading as="h6" size="md" color="red">
          {error}
        </Heading>
      </Container>
    );
  }
  return (
    <Box>
      <>
        <Container paddingTop="10" centerContent>
          <RadioGroup
            onChange={(v) => setSortingMethod(v)}
            value={sortingMethod}
          >
            <Stack direction="row">
              <Radio value="DISTANCE">Distance</Radio>
              <Radio value="RATING">Rating</Radio>
            </Stack>
          </RadioGroup>
        </Container>
        <Container maxW="container.lg" marginTop="10" width="100%">
          <SimpleGrid columns={[1, 2]} spacing="40px">
            {places.length > 0 ? (
              <PlacesList places={places} />
            ) : (
              <Container maxW="xl" centerContent>
                <Heading as="h6" size="md" color="red">
                  No data to show
                </Heading>
              </Container>
            )}
          </SimpleGrid>
        </Container>
      </>
    </Box>
  );
};

export default GetPlaces;
