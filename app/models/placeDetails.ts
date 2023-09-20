export interface PlaceDetails {
    name: string;
    fullAddress: string;
    numberOfReviews: number;
    website: string;
    phoneNumber: string;
    directions: string;
    restaurantRating: number;
    photos: string[];
    placeTypes: string[];
    placeId?: string;
  }
  
  export interface ErrorDetails {
    error: string;
  }
  
  export type PlaceDetailsResponse = PlaceDetails | ErrorDetails;
  
export interface PlaceInfo {
    id: string;
    placeName: string;
    temperature: string;
    imageUri: string;
    placeId: string;
    feelsLike: number;
}