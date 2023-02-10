import { json } from '@sveltejs/kit'
import rdfkv from '$lib/ld/rdf-kv.js'
import { update, queryJSON } from '$lib/ld/query.js'
import arrayify from '$lib/arrayify.js'
import { addFoursquareToVenue } from '$lib/places.js'

export async function GET() {
  let response = await queryJSON(`
    construct {
      ?sub vox:venueDescription ?description .
      ?sub vox:venueWebsite ?website .
      ?sub vox:fsq_id ?id .
      ?sub ?pred ?obj .
    }
    where {
      ?sub rdf:type <vox:Point> .
      ?sub vox:venue ?venue .
      optional { ?venue vox:description ?description . }
      optional { ?venue vox:website ?website . }
      ?venue vox:fsq_id ?id .
      ?sub ?pred ?obj .
    }`)

  let arr = arrayify(response)
  const points = await Promise.all(arr.map(addFoursquareToVenue));

  console.log(points)

  return json({
    points: points
  })
}

export async function POST({ request }) {
  let formData = await request.formData()
  let id = formData.get('id')
  formData.delete('id')
  formData.append('rdf:type :', 'vox:Point')

  let map = formData.get('vox:map')
  let updateData = rdfkv(id, formData)
  if (map) {
    updateData.insert = `${updateData.insert} <${map}> rdf:type <vox:Map> .`
  }
  await update(updateData)
  return json({
    point: "created",
    trx: updateData
  })
}