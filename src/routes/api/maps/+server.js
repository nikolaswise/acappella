import { json, error } from '@sveltejs/kit'
import { queryJSON } from '$lib/ld/query.js'
import arrayify from '$lib/arrayify.js'

export async function GET() {
  let response = await queryJSON(`
    construct {
      ?sub ?pred ?obj .
      ?sub vox:point ?point .
    }
    where {
      ?sub ?pred ?obj .
      ?point vox:map ?sub .
    }`)
  return json({
    maps: arrayify(response)
  })
}