<script lang="ts">
  import { Chart, registerables } from "chart.js";
  import readableFileSize from "../utils/readableFileSize";
  import { beforeUpdate, onMount } from "svelte";
  import type { FileInfos, Manifest } from "../utils/types";

  //export let manifest: Manifest;
  export let responseImgInfos: Map<string, FileInfos>;

  let myCanvas: HTMLCanvasElement;
  let myChart: Chart;
  let showPNG = true;
  let showOriginal = true;
  let showWebPNL = true;

  let manifest = Object.fromEntries(responseImgInfos);

  function fillData(manifest: Manifest): [string[], number[], string[]] {
    const labels: string[] = [];
    let sizes: number[] = [];
    const bgcolor: string[] = [];

    // Inputfile
    if (showOriginal === true) {
      labels.push("Originaldatei");
      sizes.push(manifest.inputfile.filesize);
      bgcolor.push("rgba(136, 140, 160, 0.5)");
    }

    // PNG
    if (showPNG === true) {
      labels.push("PNG");
      sizes.push(manifest.png.filesize);
      bgcolor.push("rgba(60, 239, 57, 0.5)");
    }

    // WebP nearLossless
    if (showWebPNL === true) {
      labels.push("WebP nearLossless");
      sizes.push(manifest["webp-nearlossless"].filesize);
      bgcolor.push("rgba(57, 87, 239, 0.5)");
    }

    // JPEG
    for (const jpeg of Object.entries(manifest).filter((entry) =>
      entry[0].startsWith("jpeg-q")
    )) {
      labels.push(`JPEG, Q ${jpeg[1].quality as number}`);
      sizes.push(jpeg[1].filesize);
      bgcolor.push("rgba(239, 145, 57, 0.5)");
    }

    // WebP
    for (const webp of Object.entries(manifest).filter((entry) =>
      entry[0].startsWith("webp-q")
    )) {
      labels.push(`WebP, Q ${webp[1].quality as number}`);
      sizes.push(webp[1].filesize);
      bgcolor.push("rgba(57, 87, 239, 0.5)");
    }

    sizes = sizes.map((curr) => readableFileSize(curr));
    return [labels, sizes, bgcolor];
  }

  const [labels, data, bgcolor] = fillData(manifest);
  Chart.register(...registerables);

  onMount(() => {
    myChart = new Chart(myCanvas as HTMLCanvasElement, {
      type: "bar",
      data: {
        // Original, JPEG, PNG, WebP
        labels,
        datasets: [
          {
            label: "Größe in kiB",
            data,
            backgroundColor: bgcolor,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        aspectRatio: 3,
        scales: {
          y: {
            title: {
              display: true,
              text: "kiB",
            },
            beginAtZero: true,
          },
        },
      },
    });
  });

  beforeUpdate(() => {
    const [labels, data, bgcolor] = fillData(manifest);
    if (myChart) {
      myChart.data = {
        labels,
        datasets: [
          {
            label: "Größe in kiB",
            data,
            backgroundColor: bgcolor,
          },
        ],
      };
      myChart.update();
    }
  });
</script>

<canvas bind:this={myCanvas} />
<form>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="showOriginal"
      bind:checked={showOriginal}
    />
    <label for="showOriginal" class="form-check-label">
      Original in Auswertung einbeziehen
    </label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="showPNG"
      bind:checked={showPNG}
    />
    <label for="showPNG" class="form-check-label">
      PNG in Auswertung einbeziehen
    </label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="showWebpNL"
      bind:checked={showWebPNL}
    />
    <label for="showWebpNL" class="form-check-label">
      WebP-nl in Auswertung einbeziehen
    </label>
  </div>
</form>

<style>
</style>
