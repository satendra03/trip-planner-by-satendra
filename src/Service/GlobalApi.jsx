import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const configPlace = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    "X-Goog-FieldMask": [
      "places.id",
      "places.name",
      "places.displayName",
      "places.formattedAddress",
      "places.photos",
      "places.googleMapsUri",
      "places.location",
      "places.priceLevel",
      "places.rating",
    ],
  },
};
const configCity = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    "X-Goog-FieldMask": [
      "places.name",
      "places.displayName",
      "places.photos",
      "places.googleMapsUri",
      "places.location",
    ],
  },
};

export const PHOTO_URL =
  "https://places.googleapis.com/v1/{replace}/media?maxHeightPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export const getPlaceDetails = (data) =>
  axios.post(BASE_URL, data, configPlace);
export const getCityDetails = (data) => axios.post(BASE_URL, data, configCity);

export const getRoute = async (origin, destination) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, destination }),
    });

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
