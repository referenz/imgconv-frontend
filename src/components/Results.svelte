<script lang="ts">
  import type { FileInfos, InputData } from "../utils/types";
  import Charts from "./Charts.svelte";
  import ImgFigure from "./ImgFigure.svelte";
  import Loading from "./Loading.svelte";
  import ResultsFetchImage from "./ResultsFetchImage.svelte";
  import ResultsNav from "./ResultsNav.svelte";
  export let originalImage: InputData;
  export let key: string;

  const formats = [
    "png",
    "webp-lossless",
    "webp-70",
    "webp-75",
    "webp-80",
    "webp-85",
    "jpeg-70",
    "jpeg-75",
    "jpeg-80",
    "jpeg-85",
  ];
  const requestImages = formats.map((entry) => {
    let [format, quality] = entry.split("-");
    if (format === "webp" && quality === "lossless") {
      format = "webp-nearlossless";
      quality = "";
    }

    let handler = format;
    if (quality) handler += `-q${quality}`;

    return [format, quality, handler];
  });

  let responseImgInfos = new Map<string, FileInfos>();
  responseImgInfos.set("inputfile", originalImage[1].manifest);
</script>

<div class="row">
  <div class="col-xs-4 col-sm-3 col-md-2">
    <ResultsNav handlers={requestImages} {responseImgInfos} />
  </div>

  <div class="col">
    <div class="row">
      <ImgFigure
        handler="inputfile"
        manifest={originalImage[1].manifest}
        source={originalImage[1].source}
      />
    </div>
    {#each requestImages as [format, quality, handler]}
      <div class="row">
        <ResultsFetchImage
          {key}
          {format}
          {quality}
          {handler}
          bind:responseImgInfos
        />
      </div>
    {/each}
    <div class="row" id="chart">
      {#if requestImages.length + 1 === responseImgInfos.size}
        <Charts {responseImgInfos} />
      {:else}
        <Loading />
      {/if}
    </div>
  </div>
</div>
