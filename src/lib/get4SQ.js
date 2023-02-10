import { foursquare_api_key } from '$env/static/private'

const addFourSquareToVenue = async node => {
  let result = await fetch(`${node.fsq_id}?fields=link,geocodes,location,name,description,tel,website`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': foursquare_api_key,
    }
    }).then(r => r.json())

  let venue = {
    name: result.name,
    address: result.location.formatted_address,
    longitude: result.geocodes.main.longitude,
    latitude: result.geocodes.main.latitude,
    tel: result.tel,
    website: result.website
  }
  return Object.assign(venue, node)
}

export default addFourSquareToVenue