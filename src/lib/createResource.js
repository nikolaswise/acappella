import rdfkv from '$lib/ld/rdf-kv'

export const createVenue = async (place) => {
  let formData = new FormData()
  let id = `${window.location.origin}/${crypto.randomUUID()}`
  formData.append('vox:fsq_id :', place.fsq_id)
  formData.append('rdf:type :', 'vox:Venue')
  let updateData = rdfkv(id, formData)
  console.log(updateData)
  return id
}

export const createPoint = async ({venue, map}) => {
  let formData = new FormData()
  let id = `${window.location.origin}/${crypto.randomUUID()}`
  formData.append('rdf:type :', 'vox:Point')
  formData.append('vox:venue :', venue)
  formData.append('vox:map :', map)
  let updateData = rdfkv(id, formData)
  console.log(updateData)
  return id
}