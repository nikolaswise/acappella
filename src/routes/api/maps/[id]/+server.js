import { json, error } from '@sveltejs/kit'
import { queryJSON } from '$lib/ld/query'

export async function GET({params}) {

  let response = await queryJSON(`
    construct {
      <${params.id}> ?pred ?obj .
      <${params.id}> vox:point ?point .
    }
    where {
      <${params.id}> ?pred ?obj .
      ?point vox:map <${params.id}>  .
    }`)
  return json({
    map: response
  })
}
