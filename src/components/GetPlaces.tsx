import { Image } from '@chakra-ui/image';
import { Badge, Box, Container, Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Spinner } from '@chakra-ui/spinner';
import React, { Fragment, useEffect, useState } from 'react';
import { getPlaces } from '../api/apiRequest';
import { Errors, Place } from '../types';
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
      console.error(error);
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
    <div>
      <>
        <Container maxW="xl">
          <Heading as="h6" size="md">
            Please select sorting method
          </Heading>
          <Select
            // placeholder="Select option"
            onChange={(e) => {
              setSortingMethod(e.target.value);
            }}
            defaultValue={'DISTANCE'}
          >
            <option value="DISTANCE">Distance</option>
            <option value="RATING">Rating</option>
          </Select>
          {places.length > 0 ? (
            <PlacesList places={places} />
          ) : (
            <Container maxW="xl" centerContent>
              <Heading as="h6" size="md" color="red">
                No data to show
              </Heading>
            </Container>
          )}
        </Container>
      </>
    </div>
  );
};

export default GetPlaces;
