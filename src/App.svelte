<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import TopNavigation from "./components/TopNavigation.svelte";
  import UploadForm from "./components/UploadForm.svelte";
  import Results from "./components/Results.svelte";
  import Error from "./components/Error.svelte";
  import { globalState } from "./utils/state";
  import About from "./components/About.svelte";

  let error: string;
  let originalImage: OriginalImage;

  import io from 'socket.io-client'

  const host = (import.meta.env.PROD) ? '0.0.0.0' : 'localhost';

  import type { OriginalImage } from "./utils/types";
  let socket = io(`ws://${host}:3001`)

  socket.on("upload-successful", () => { globalState.set("RESULTS"); })
  socket.on("error", msg => {
    error = msg as string;
    globalState.set("ERROR")
  })

  export let url = "";
</script>

<Router url={url} basepath={import.meta.env.BASE_URL}>
  <TopNavigation />
  <main class="container-fluid">
    <Route path="about"><About bind:socket /></Route>
    <Route path="/">
      {#if $globalState === "INIT"}
        <UploadForm bind:socket bind:originalImage />
      {:else if $globalState === "RESULTS"}
        <Results bind:socket {originalImage} />
      {:else if $globalState === "ERROR"}
        <Error {error} />
      {/if}
    </Route>
  </main>
</Router>

<style>
  main {
    text-align: center;
    padding-top: 2rem;
  }
</style>
