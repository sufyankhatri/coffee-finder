import React, { Fragment } from 'react';
import { Place } from '../types';
import PlaceItem from './PlaceItem';

interface PlacesListProps {
  places: Place[];
}

const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  const getPhotoUrl = (item: any) => {
    return item.photos.length > 0
      ? item.photos[0].prefix + 'original' + item.photos[0].suffix
      : 'https://static8.depositphotos.com/1338574/829/i/600/depositphotos_8292951-stock-photo-the-letter-c-in-gold.jpg';
  };

  const getPriceRange = (price: number) => {
    const priceRangeMaps: { [key: number]: string } = {
      1: 'Cheap',
      2: 'Moderate',
      3: 'Expensive',
      4: 'Very Expensive',
    };
    return priceRangeMaps[price] || 'Very Expensive';
  };

  return (
    <Fragment>
      {places.map((item: any, index) => {
        const photoUrl = getPhotoUrl(item);
        const priceRange = getPriceRange(item.price);

        return (
          <Fragment key={index}>
            {item.hours.open_now && (
              <PlaceItem
                photoUrl={photoUrl}
                priceRange={priceRange}
                item={item}
              />
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default PlacesList;
