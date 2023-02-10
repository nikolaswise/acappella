import { json } from '@sveltejs/kit'
import rdfkv from '$lib/ld/rdf-kv.js'
import { update, queryJSON } from '$lib/ld/query.js'
import arrayify from '$lib/arrayify.js'


export async function GET() {
  let response = await queryJSON(`
    construct {
      ?sub ?pred ?obj .
    }
    where {
      ?sub rdf:type <vox:Map> .
      ?sub ?pred ?obj .
    }`)
  return json({
    maps: arrayify(response)
  })
}

export async function POST({ request }) {
  let formData = await request.formData()
  let id = formData.get('id')
  formData.delete('id')
  formData.append('rdf:type :', 'vox:Map')
  let updateData = rdfkv(id, formData)
  await update(updateData)
  return json({
    map: "created",
    trx: updateData
  })
}