export const createVenue = async (place) => {
  let formData = new FormData()
  let id = `${window.location.origin}/${crypto.randomUUID()}`
  formData.append('id', id)
  formData.append('vox:fsq_id :', place.fsq_id)
  formData.append('rdf:type :', 'vox:Venue')
  await fetch('/api/venues', {
    method: 'post',
    body: formData,
  })
  return id
}

export const createPoint = async ({venue, map}) => {
  let formData = new FormData()
  let id = `${window.location.origin}/${crypto.randomUUID()}`
  formData.append('id', id)
  formData.append('rdf:type :', 'vox:Point')
  formData.append('vox:venue :', venue)
  formData.append('vox:map :', map)
  await fetch('/api/points', {
    method: 'post',
    body: formData,
  })
  return id
}