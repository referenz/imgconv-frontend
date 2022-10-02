<script lang="ts">
  import type { FileInfos } from "../utils/types";
  import readableFileSize from "../utils/readableFileSize";

  export let image: [
    handler: string,
    fileinfos: { fileinfos?: FileInfos; source: string }
  ];
</script>

<figure class="figure">
  <img
    class="figure-img img-fluid"
    id={image[0]}
    src={image[1].source}
    alt={image[1].fileinfos?.filename}
  />
  <figcaption class="figure-caption">
    <a href={image[1].source} download={image[1].fileinfos?.filename}>
      {image[1].fileinfos?.filename}
    </a>
    <br />
    {#if image[0] === 'inputfile'}
      Originaldatei |
    {/if}
    {#if image[1].fileinfos?.quality}
      Qualität: {image[1].fileinfos.quality} |
    {/if}
    Größe: {readableFileSize(image[1].fileinfos?.filesize ?? 0)} kiB
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
    background-image: url(./file-earmark-arrow-down.svg);
    background-position: left top;
    background-repeat: no-repeat;
    padding-left: 20px;
  }
</style>
