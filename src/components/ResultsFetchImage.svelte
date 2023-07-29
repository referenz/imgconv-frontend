<script lang="ts">
  import Loading from "./Loading.svelte";
  import type { FileInfos, ResponseImage } from "../utils/types";
  import ImgFigure from "./ImgFigure.svelte";
  import type { Socket } from "socket.io-client";

  export let format: string;
  export let quality: string;
  export let handler: string;
  export let responseImgInfos: Map<string, FileInfos | null>;
  export let socket: Socket;

  async function fetchImage(format: string, quality: string, handler: string): Promise<[ArrayBuffer, FileInfos]> {
    return new Promise<[ArrayBuffer, FileInfos]>((resolve, reject) => {
      socket.emit("request", handler, format, quality);

      socket.on("request-answer", (res: ResponseImage) => {
        if (res.handler === handler) {
          responseImgInfos.set(handler, { filename: res.filename, filesize: res.filesize, quality: res.quality });
          responseImgInfos = responseImgInfos;

          resolve([res.binary, { filename: res.filename, filesize: res.filesize, quality: res.quality }]);
        }
      });

      socket.on("request-error", (msg: string) => {
        responseImgInfos.set(handler, null);
        responseImgInfos = responseImgInfos;

        reject(new Error(msg));
      });
    });
  }
</script>

{#await fetchImage(format, quality, handler)}
  <Loading />
{:then [source, manifest]}
  <ImgFigure {handler} {source} {manifest} />
{:catch errmsg}
  <p>Konnte nicht abrufen: {handler} - {errmsg}</p>
{/await}
