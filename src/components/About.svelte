<script lang="ts">
  import type { Socket } from "socket.io-client";
  export let socket: Socket;

  const connected = (socket.connected) ? true : false;
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
  Frontend-Code: <a href="https://github.com/referenz/imgconv-frontend">https://github.com/referenz/imgconv-frontend</a>
</p>
<p>
  Backend-Code: <a href="https://github.com/referenz/imgconv-backend">https://github.com/referenz/imgconv-backend</a>
</p>
