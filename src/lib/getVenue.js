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
    fsq_id: `https://api.foursquare.com${result.link}`,
    address: result.location.formatted_address,
    longitude: result.geocodes.main.longitude,
    latitude: result.geocodes.main.latitude,
    tel: result.tel,
    website: result.website
  }
  return Object.assign(venue, response)
}

export default getVenue