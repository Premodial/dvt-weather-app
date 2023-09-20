import axios from 'axios';
import { PlaceDetails, PlaceDetailsResponse } from '../../models/placeDetails';

/**
 * Get the nearby place details based on latitude and longitude.
 *
 * @param lat - Latitude of the location
 * @param lng - Longitude of the location
 * @returns A promise that is resolved to a PlaceDetails object or an ErrorDetails object
 */
export const getPlaceDetails = async (lat: number, lng: number): Promise<PlaceDetailsResponse> => {
const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  try {
    const response = await axios.get(url, {
      params: {
        location: `${lat},${lng}`,
        radius: 50,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const { results } = response.data;
    
    if (results[0]) {
      return getPlaceDetail(results[0].place_id);
    }

    throw new Error('No places found');
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get the detail of a place based on its place ID.
 *
 * @param placeId - The place ID retrieved from Google Maps API
 * @returns A promise that is resolved to a PlaceDetails object or an ErrorDetails object
 */
export const getPlaceDetail = async (placeId: string): Promise<PlaceDetailsResponse> => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}&fields=name,address_components,formatted_address,rating,user_ratings_total,website,formatted_phone_number,geometry,photos,types`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      const place = data.result;
      const details = mapPlaceDetails(place, placeId);
      return details;
    }

    throw new Error(`Google Places API returned status: ${data.status}`);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Maps the API response to a PlaceDetails object.
 *
 * @param place - The place object returned from Google Maps API
 * @param placeId - The place ID retrieved from Google Maps API
 * @returns A PlaceDetails object
 */
const mapPlaceDetails = (place: any, placeId: string): PlaceDetails => {
  const photos = place.photos ? place.photos.map((photo: any) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`) : [];
  
  return {
    name: place.name,
    fullAddress: place.formatted_address,
    numberOfReviews: place.user_ratings_total,
    website: place.website || 'N/A',
    phoneNumber: place.formatted_phone_number || 'N/A',
    directions: `https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}`,
    restaurantRating: place.rating,
    photos: photos,
    placeTypes: place.types || [],
    placeId: placeId,
  };
};

  