<script lang="ts">
  import type { FileInfos } from "src/utils/types";

  export let handlers: string[][];
  export let responseImgInfos: Map<string, FileInfos>;

  const webps: string[][] = [];
  const jpegs: string[][] = [];
  let rest: string[][] = [];

  handlers.forEach((handler: string[]) => {
    if (handler[0] === "webp") webps.push(handler);
    else if (handler[0] === "jpeg") jpegs.push(handler);
    else rest.push(handler);
  });

  // Deep Clone des Arrays, weil sich sont die Werte in den anderen Komponenten ändern.
  rest = JSON.parse(JSON.stringify(rest)) as string[][];
  rest.forEach((entry) => {
    if (entry[0] === "png") entry[0] = "PNG";
    else if (entry[0] === "webp-nearlossless") entry[0] = "WebP nearlossless";
  });
</script>

<ul id="bildernav">
  <li>
    <a href="#inputfile">Original</a>
  </li>
  {#each rest as [name,,handler]}
    <li>
      <a
        href={`#${handler}`}
        class={responseImgInfos.has(handler) ? "done" : "loading"}
        >{name}</a
      >
    </li>
  {/each}
  <li>
    WebP
    <ul class="secondhier">
      {#each webps as [, quality, handler]}
        <li>
          <a
            href={`#${handler}`}
            class={responseImgInfos.has(handler) ? "done" : "loading"}
            >Qualität: {quality}</a
          >
        </li>
      {/each}
    </ul>
  </li>
  <li>
    JPEG
    <ul class="secondhier">
      {#each jpegs as [, quality, handler]}
        <li>
          <a
            href={`#${handler}`}
            class={responseImgInfos.has(handler) ? "done" : "loading"}
            >Qualität: {quality}</a
          >
        </li>
      {/each}
    </ul>
  </li>
  <li>
    <a href="#chart">Vergleichschart</a>
  </li>
</ul>

<style>
  ul {
    padding-left: 15px;
    position: sticky;
    top: 15px;
  }

  li {
    display: block;
    text-align: left;
    padding-bottom: 0.67em;
  }

  ul.secondhier {
    padding-left: 10px;
    font-size: 80%;
  }

  li a {
    color: inherit;
  }

  a.loading::after {
    display: inline-block;
    width: 2ex;
    height: 0.9rem;
    content: " ";
    background: url("../assets/arrow-clockwise.svg") right center no-repeat;
    margin-left: 0.9ex;
    animation: rotation 3s linear infinite;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  a.done::after {
    content: " ";
    background: url("../assets/check-circle-fill.svg") right center no-repeat;
    padding-right: 2.5ex;
    background-size: 75% auto;
  }
</style>
