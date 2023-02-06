import { json, error } from '@sveltejs/kit'
import { queryJSON } from '$lib/ld/query'

export async function GET({params}) {

  let response = await queryJSON(`
    construct {
      <${params.id}> ?pred ?obj .
      <${params.id}> vox:point ?point .
      <${params.id}> vox:map ?map .
    }
    where {
      <${params.id}> ?pred ?obj .
      ?point vox:venue <${params.id}> .
      ?point vox:map ?map .
    }`)
  return json({
    venue: response
  })
}
