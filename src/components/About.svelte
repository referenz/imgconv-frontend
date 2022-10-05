<script lang="ts">
  import { fetchURL } from "../utils/fetchUrlProvider";

  $: connected = false;
  fetch(fetchURL + "/")
    .then((response) => {
      if (response.ok && response.status === 200) connected = true;
    })
    .catch(() => (connected = false));
</script>

<h1>ImgConv: Bilder online konvertieren</h1>
<p>
  Verbindung zum Backend:
  {#if !connected}
    <button type="button" class="btn btn-warning">nicht hergestellt</button>
  {:else}
    <button type="button" class="btn btn-success">hergestellt</button>
  {/if}
</p>
<hr />
<p>
  Frontend-Code: <a href="https://github.com/referenz/imgconv-frontend"
    >https://github.com/referenz/imgconv-frontend</a
  >
</p>
<p>
  Backend-Code: <a href="https://github.com/referenz/imgconv-backend"
    >https://github.com/referenz/imgconv-backend</a
  >
</p>
