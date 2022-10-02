<script lang="ts">
  import Loading from "./Loading.svelte";
  import type { FileInfos } from "../utils/types";
  import ImgFigure from "./ImgFigure.svelte";
  import { afterUpdate } from "svelte";

  export let key: string;
  export let format: string;
  export let quality: string | null = null;
  export let handler: string;
  export let responseImgInfos: Map<string, FileInfos>;

  let fetchedImage: string;
  let manifest: FileInfos;

  let resolved = false;

  async function resolve() {
    const fetchURL = import.meta.env.DEV
      ? "http://localhost:3001"
      : "https://referenz.io/ImgConv/backend";

    let response: Response;
    if(quality) response = await fetch(`${fetchURL}/${key}/${format}/${quality}`);
    else response = await fetch(`${fetchURL}/${key}/${format}`);
    const formdata = await response.formData();

    fetchedImage = await (formdata.get("file") as File).text();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/await-thenable
    manifest = JSON.parse(await formdata.get("manifest")?.toString() ?? '');

    responseImgInfos.set(handler, manifest)
    resolved = true;
  }
  void resolve();

  afterUpdate(() => responseImgInfos = responseImgInfos);
</script>

{#if resolved}
  <ImgFigure image={[handler, { fileinfos: manifest, source: fetchedImage }]} />
{:else}
  <Loading />
{/if}

