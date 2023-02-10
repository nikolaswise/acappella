import { json, error } from '@sveltejs/kit'
import { queryJSON } from '$lib/ld/query'
import get4SQ from '$lib/get4SQ.js'

export async function GET({params}) {
  let id = atob(params.id)
  let response = await queryJSON(`
    construct {
      <${id}> ?pred ?obj .
      <${id}> vox:fsq_id ?id .
    }
    where {
      <${id}> ?pred ?obj .
      <${id}> vox:venue ?venue .
      ?venue vox:fsq_id ?id .

    }`)


  const point = await get4SQ(response)

  console.log(point)
  return json({
    point
  })
}
