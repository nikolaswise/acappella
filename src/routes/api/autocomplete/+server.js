import { json } from '@sveltejs/kit';
import { foursquare_api_key } from '$env/static/private'
import { queryJSON } from '$lib/ld/query'

// curl --request GET \
//      --url 'https://api.foursquare.com/v3/autocomplete?query=franks&ll=45.512514553756034%2C-122.67504711758102&radius=2500' \
//      --header 'Authorization: fsq3GcC4rcZ2a2z+I6ESQA3xcC88yoiKikKUkMiTBKN5M5Y=' \
//      --header 'accept: application/json'
const fetchFoursquarePlaces = async ({query, latLng, radius}) => {
  return await fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLng}&radius=${radius}&fields=link,geocodes,location,name,description,tel,website`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': foursquare_api_key,
    }
  })
}

const getVenue = async (result) => {
  let fsq_id = `https://api.foursquare.com${result.link}`
  let response = await queryJSON(`
    describe ?sub
    where {
      ?sub vox:fsq_id <${fsq_id}> .
    }`)
  response = Array.isArray(response) ? {} : response
  let venue = {
    name: result.name,
    fsq_id: fsq_id,
    address: result.location.formatted_address,
    longitude: result.geocodes.main.longitude,
    latitude: result.geocodes.main.latitude,
    tel: result.tel,
    website: result.website
  }
  return Object.assign(venue, response)
}

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

  const venues = await Promise.all(foursquare.results.map(getVenue));

  return json({
    query,
    radius,
    latLng: latLng.split(','),
    results: venues,
    error: error,
  })
}