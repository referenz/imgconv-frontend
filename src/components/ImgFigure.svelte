<script lang="ts">
  import type { FileInfos } from "../utils/types";
  import readableFileSize from "../utils/readableFileSize";

  export let handler: string;
  export let manifest: FileInfos;
  export let source: ArrayBuffer;

  const blob = new Blob([source]);
  const dataURL = URL.createObjectURL(blob);
</script>

<figure class="figure">
  <img
    class="figure-img img-fluid"
    id={handler}
    src={dataURL}
    alt={manifest.filename}
  />
  <figcaption class="figure-caption">
    <a href={dataURL} download={manifest.filename}>
      {manifest.filename}
    </a>
    <br />
    {#if handler === "inputfile"}
      Originaldatei |
    {/if}
    {#if manifest.quality}
      Qualität: {manifest.quality} |
    {/if}
    Größe: {readableFileSize(manifest.filesize)} kiB
  </figcaption>
</figure>

<style>
  figure {
    position: relative;
    margin-bottom: 30px;
  }

  figure img {
    width: 100%;
  }

  figcaption {
    background-color: rgba(211, 211, 211, 0.5);
    padding: 0.7rem;
    position: absolute;
    top: 1rem;
    left: 25%;
    width: 50%;
    border-radius: 15px;
    color: #000 !important;
  }
  figcaption a[download] {
    color: inherit;
    background-image: url("../assets/file-earmark-arrow-down.svg");
    background-position: left top;
    background-repeat: no-repeat;
    padding-left: 20px;
  }
</style>
