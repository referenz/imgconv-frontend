<script lang="ts">
  import Loading from "./Loading.svelte";
  import type { FileInfos } from "../utils/types";
  import ImgFigure from "./ImgFigure.svelte";
  import { fetchURL } from "../utils/fetchUrlProvider";

  export let key: string;
  export let format: string;
  export let quality: string | null = null;
  export let handler: string;
  export let responseImgInfos: Map<string, FileInfos>;

  async function fetchImage(): Promise<[string, FileInfos]> {
    let fetchedImage: string;
    let manifest: FileInfos;

    let response: Response;
    if (quality && quality !== '')
      response = await fetch(
        `${fetchURL as string}/${key}/${format}/${quality}`
      );
    else response = await fetch(`${fetchURL as string}/${key}/${format}`);
    const formdata = await response.formData();

    fetchedImage = await (formdata.get("file") as File).text();
    manifest = JSON.parse(
      formdata.get("manifest")?.toString() ?? ""
    ) as FileInfos;

    responseImgInfos.set(handler, manifest);
    responseImgInfos = responseImgInfos;
    console.log(manifest);
    return [fetchedImage, manifest];
  }
</script>

{#await fetchImage()}
  <Loading />
{:then [source, manifest]}
  <ImgFigure {handler} {source} {manifest} />
{/await}
