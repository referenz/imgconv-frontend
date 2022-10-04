<script lang="ts">
  import Loading from "./Loading.svelte";
  import type { FileInfos } from "../utils/types";
  import ImgFigure from "./ImgFigure.svelte";
  import { fetchURL } from "../utils/fetchUrlProvider";

  export let key: string;
  export let format: string;
  export let quality: string;
  export let handler: string;
  export let responseImgInfos: Map<string, FileInfos>;

  async function fetchImage(): Promise<[string, FileInfos]> {
    quality &&= `/${quality}`;
    const response = await fetch(`${fetchURL}/${key}/${format}${quality}`);
    const formdata = await response.formData();

    const fetchedImage = await (formdata.get("file") as File).text();
    const manifest = JSON.parse(formdata.get("manifest")?.toString() ?? "") as FileInfos;

    responseImgInfos.set(handler, manifest);
    responseImgInfos = responseImgInfos;

    return [fetchedImage, manifest];
  }
</script>

{#await fetchImage()}
  <Loading />
{:then [source, manifest]}
  <ImgFigure {handler} {source} {manifest} />
{/await}
