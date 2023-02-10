import { foursquare_api_key } from '$env/static/private'
import { queryJSON } from '$lib/ld/query'
import rdfkv from '$lib/ld/rdf-kv'

export const fetchFoursquarePlaces = async ({query, latLng, radius}) => {
  return await fetch(`https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLng}&radius=${radius}&fields=link,geocodes,location,name,description,tel,website`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': foursquare_api_key,
    }
  })
}

export const addFoursquareToVenue = async node => {
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

export const addVenueToFoursquare = async (result) => {
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

export const createVenue = (place) => {
  let formData = new FormData()
  let id = crypto.randomUUID()
  let fsq_id = `https://api.foursquare.com${place.link}`
  formData.append('vox:fsq_id :', ``)
  formData.append('vox:fsq_id :', fsq_id)
  formData.append('rdf:type :', 'vox:Venue')
  let updateData = rdfkv(id, formData)
  console.log(updateData)
  return true
}

export const createPoint = ({venue, map}) => {
  let formData = new FormData()
  let id = crypto.randomUUID()
  formData.append('rdf:type :', 'vox:Point')
  formData.append('vox:venue :', venue)
  formData.append('vox:map :', map)
  let updateData = rdfkv(id, formData)
  console.log(updateData)
  return true
}