import { error } from '@sveltejs/kit'
import { queryJSON } from '$lib/ld/query'
import arrayify from '$lib/arrayify'

const getResource = async id => {
  console.log(id)
  let result = await queryJSON(`
    construct {
      <${id}> ?pred ?obj .
      <${id}> vox:point ?point .
    }
    where {
      <${id}> ?pred ?obj .
      optional { ?point vox:map <${id}>  . }
    }`)
  console.log(result)
  if (result.length === 0) {
    throw error(404, 'Resource not found.')
  }
  result.point = arrayify(result.point)
  return result
}

export default getResource