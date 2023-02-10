<script type="text/javascript">
  import {onMount} from 'svelte'
  // import CreateResource from '$lib/components/CreateResource.svelte'
  let data
  onMount(async () => {
    data = await fetch('/api/maps').then(r => r.json())

  })

</script>

<h1>
  Acappella
</h1>

<h2>Maps</h2>

<form
  action='/{crypto.randomUUID()}'
  method='post'>
  <label>
    New Map
    <input
      type="text"
      name="vox:title"
    />
  </label>
  <input
    type="hidden"
    name="rdf:type :"
    value="vox:Map">
  <button>
    Submit
  </button>
</form>

{#if data}
  <ul>
    {#each data.maps as map}
      <li><a href="{map.id}">{map.title}</a></li>
    {/each}
  </ul>
{/if}

<p>
  <a href="/docs">Documentation</a>
</p>
