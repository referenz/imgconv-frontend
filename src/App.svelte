<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import TopNavigation from "./components/TopNavigation.svelte";
  import UploadForm from "./components/UploadForm.svelte";
  import Results from "./components/Results.svelte";
  import Error from "./components/Error.svelte";
  import { globalState } from "./utils/state";
  import type { InputData, OutputData } from "./utils/types";
  import About from "./components/About.svelte";

  export let url = "";

  let originalImage: InputData;
  let outputImages: OutputData;
  let key: string;
</script>

<Router url={url} basepath={import.meta.env.BASE_URL}>
  <TopNavigation />
  <main class="container-fluid">
    <Route path="about" component={About} />
    <Route path="/">
      {#if $globalState === "INIT"}
        <UploadForm bind:originalImage bind:key />
      {:else if $globalState === "RESULTS"}
        <Results {originalImage} {key} />
      {:else if $globalState === "ERROR"}
        <Error output={outputImages} />
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
