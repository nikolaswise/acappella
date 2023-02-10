<script type="text/javascript">
  import { createVenue, createPoint } from '$lib/createResource'
  export let data
  console.log(data)

  let editingTitle = false

  let term
  let searchResults

  const placeSearch = (term) => async () => {
    searchResults = await fetch(`/api/autocomplete?query=${term}&radius=25000&latLng=45.512514553756034,-122.67504711758102`).then(r => r.json())
  }

  const addPlace = (result) => async () => {
    console.log(result)
    let venue = result.id
    if (result.type) {
      console.log('this place is an acappella venue')
    } else {
      console.log(`create a venue from this place`)
      let venue = await createVenue(result)
    }
    console.log('create map point')
    console.log(`venue`, venue )
    console.log(`map`, data.id )
    searchResults = null
  }
</script>

<p>
  <mark>{data.id}</mark>
</p>


{#if editingTitle }
  <form
    action='{data.id}'
    method='post'>
    <label>
      Title
      <h1>
        <input
          type="text"
          name="= vox:title"
          bind:value={data.title}
        />
      </h1>
    </label>
    <button>
      Update
    </button>
  </form>
{:else}
  <h1>{data.title}</h1>
  <button on:click={() => editingTitle = !editingTitle}>
    edit
  </button>
{/if}

<form
  action='{data.id}'
  method='post'>
  <label>
    Body
    <textarea name="= vox:body" bind:value={data.body}></textarea>
  </label>
  <button>
    Save
  </button>
</form>

<h2>Map Points</h2>

<form>
  <label>
    Search For Places
    <input type="text" name="" bind:value={term}>
    <button on:click={placeSearch(term)}>search</button>
  </label>
</form>

{#if searchResults}
  <ol>
    {#each searchResults.results as result}
      <li>
        <button on:click={addPlace(result)}>
          <p>{#if result.type}✅ {/if}{result.name}</p>
          <p>{result.address}</p>
        </button>

      </li>
    {/each}
  </ol>
{/if}

<style type="text/css">
  label,
  textarea {
    display: block;
    width: 100%;
  }
  label {
    margin-top: 2rem;
  }
  button {
    cursor: pointer;
  }
  ol li button {
    text-align: left;
    width: 100%;
    padding: 0.5rem;
  }
  button p {
    padding: 0;
    margin: 0;
  }
</style>