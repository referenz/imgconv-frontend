<script lang="ts">
    import { globalState } from '../utils/state';
    import type { OutputData } from '../utils/types';
    export let output: OutputData;
    const error = output?.get('error') as string ?? 'unbekannter Fehler';
</script>

<h2>Fehler</h2>
<p>{error}</p>
<p>
  <button type="button" on:click={() => globalState.set('INIT')}>Reset</button>
</p>
