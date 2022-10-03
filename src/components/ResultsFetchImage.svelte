<script lang="ts">
  import { afterUpdate } from "svelte";
  import Loading from "./Loading.svelte";
  import type { FileInfos } from "../utils/types";
  import ImgFigure from "./ImgFigure.svelte";
  import { fetchURL } from "../utils/fetchUrlProvider";

  export let key: string;
  export let format: string;
  export let quality: string | null = null;
  export let handler: string;
  export let responseImgInfos: Map<string, FileInfos>;

  let fetchedImage: string;
  let manifest: FileInfos;

  let resolved = false;

  async function resolve() {
    let response: Response;
    if (quality)
      response = await fetch(`${fetchURL as string}/${key}/${format}/${quality}`);
    else response = await fetch(`${fetchURL as string}/${key}/${format}`);
    const formdata = await response.formData();

    fetchedImage = await (formdata.get("file") as File).text();
    // eslint-disable-next-line @typescript-eslint/await-thenable
    manifest = (JSON.parse((await formdata.get("manifest")?.toString()) ?? "")) as FileInfos;

    responseImgInfos.set(handler, manifest);
    resolved = true;
  }
  void resolve();

  afterUpdate(() => (responseImgInfos = responseImgInfos));
</script>

{#if resolved}
  <ImgFigure image={[handler, { fileinfos: manifest, source: fetchedImage }]} />
{:else}
  <Loading />
{/if}
