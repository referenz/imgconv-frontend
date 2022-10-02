<script lang="ts">
  import TopNavigation from "./components/TopNavigation.svelte";
  import UploadForm from "./components/UploadForm.svelte";
  import Results from "./components/Results.svelte";
  import Error from "./components/Error.svelte";
  import { globalState } from "./utils/state";
  import type { InputData, OutputData } from './utils/types';

  let originalImage: InputData = null;
  let outputImages: OutputData = null;
  let key: string = null;
</script>

<TopNavigation />
<main class="container-fluid">
  {#if $globalState === "INIT"}
    <UploadForm bind:originalImage={originalImage} bind:outputImages={outputImages} bind:key={key} />
  {:else if $globalState === 'RESULTS'}
    <Results originalImage={originalImage} key={key} />
  {:else if $globalState === "ERROR"}
    <Error output={outputImages} />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding-top: 2rem;
  }
</style>
