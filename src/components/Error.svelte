<script lang="ts">
    import { globalState } from '../utils/state';
    export let error: string;
</script>

<h2>Fehler</h2>
<p>{error}</p>
<p>
  <button type="button" on:click={() => { globalState.set('INIT'); }}>Reset</button>
</p>
