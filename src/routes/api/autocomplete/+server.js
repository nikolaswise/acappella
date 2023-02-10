import { json } from '@sveltejs/kit';
import {fetchFoursquarePlaces, addVenueToFoursquare} from '$lib/places.js'

export async function GET({ url }) {
  let query = url.searchParams.get('query')
  let radius = url.searchParams.get('radius')
  let latLng = url.searchParams.get('latLng')

  let foursquare
  let error
  try {
    foursquare = await fetchFoursquarePlaces({query, radius, latLng}).then(r => r.json())
  } catch (e) {
    foursquare = null
    error = e
  }

  const venues = await Promise.all(foursquare.results.map(addVenueToFoursquare));

  return json({
    query,
    radius,
    latLng: latLng.split(','),
    results: venues,
    error: error,
  })
}