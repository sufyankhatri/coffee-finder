import axios from 'axios';
import { Place } from '../types';

export const getPlaces = async (
  ll: string,
  sortingMethod: string
): Promise<Place[]> => {
  var config: any = {
    method: 'get',
    url: `https://try.readme.io/https://api.foursquare.com/v3/places/search?query=coffee&ll=${ll}&radius=1000&categories=13032&fields=distance%2Cprice%2Chours%2Cphotos%2Cname&sort=${sortingMethod}&limit=10`,
    headers: {
      Authorization: 'fsq3VbYHI6Y4E4A9fGJnkLIQXNH0+PfnjEdPQ4cdSDs+y3c=',
      'Access-Control-Allow-Origin': '*',
    },
  };
  const response = await axios(config);
  return response.data.results;
};
