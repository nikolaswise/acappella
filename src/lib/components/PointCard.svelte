<script>
  import { onMount } from 'svelte'
  export let id
  let data

  onMount(async () => {
    let resp = await fetch(`/api/points/${btoa(id)}`).then(r => r.json())
    data = resp.point
    console.log(data)
  })
</script>

<div>
  <mark>{id}</mark>
  {#if data}
    <p>{data.name}</p>
    <p>{data.address}</p>
    <p>{data.tel}</p>
    <p><a href="{data.website}">{data.website}</a></p>
    <p>
      <mark>
        {data.latitude}, {data.longitude}
      </mark>
    </p>
  {:else}
    <p>…</p>
  {/if}
</div>

<style type="text/css">
  div {
    border: 1px solid gray;
    padding: 1rem;
    margin-top: 1rem;
  }
</style>