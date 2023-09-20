export interface Favorite {
    userId: string;
    latitude: number;
    longitude: number;
    forecast: any;
    current: any;
    photo: string;
    placeId: string;
    date: string;
    name: string;
  }

  /**
 * A type representing the return structure of the addFavorite function.
 */
export type AddFavoriteResponse = {
    status: 'success' | 'failure';
    message: string;
    docId?: string;
  };
  