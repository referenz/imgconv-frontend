<script lang="ts">
  import Loading from "./Loading.svelte";
  import type { ErrorMsg, FileInfos } from "../utils/types";
  import ImgFigure from "./ImgFigure.svelte";
  import { fetchURL } from "../utils/fetchUrlProvider";

  export let key: string;
  export let format: string;
  export let quality: string;
  export let handler: string;
  export let responseImgInfos: Map<string, FileInfos | null>;

  async function fetchImage(): Promise<[string, FileInfos]> {
    quality = quality ? "/" + quality : '';
    const response = await fetch(`${fetchURL}/${key}/${format}${quality}`);
    const formdata = await response.formData();
    // const formdata = await fetch(`${fetchURL}/${key}/${format}${quality}`) |> await %.formData()

    if (formdata.has("error")) {
      responseImgInfos.set(handler, null);
      responseImgInfos = responseImgInfos;
      return Promise.reject((JSON.parse(formdata.get("error")?.toString() ?? 'Fehler') as ErrorMsg).message);
    }

    const fetchedImage = await (formdata.get("file") as File).text();
    const manifest = JSON.parse(
      formdata.get("manifest")?.toString() ?? ""
    ) as FileInfos;

    responseImgInfos.set(handler, manifest);
    responseImgInfos = responseImgInfos;

    return [fetchedImage, manifest];
  }
</script>

{#await fetchImage()}
  <Loading />
{:then [source, manifest]}
  <ImgFigure {handler} {source} {manifest} />
{:catch errmsg}
  <p>Konnte nicht abrufen: {handler} - {errmsg}</p>
{/await}
