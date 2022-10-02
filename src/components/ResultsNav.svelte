<script lang="ts">
  export let handlers: string[][];

  // Deep Clone des Arrays. Wenn das nicht passiert, werden Daten in Eltern-
  // und Geschwisterkomponenten verändern. Grund dafür ist mir unklar.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  handlers = JSON.parse(JSON.stringify(handlers));

  let webps: string[][] = [];
  let jpegs: string[][] = [];
  let rest: string[][] = [];

  handlers.forEach((handler: string[]) => {
    if (handler[0] === "webp") webps.push(handler);
    else if (handler[0] === "jpeg") jpegs.push(handler);
    else rest.push(handler);
  });

  rest.map(entry => {
    if(entry[2] === 'png') entry[2] = 'PNG';
    else if(entry[2] === 'webp-nearlossless') entry[2] = 'WebP nearlossless';
  })
  console.log(rest);

</script>

<ul id="bildernav">
  <li>
    <a href="#inputfile">Original</a>
  </li>
  {#each rest as image}
    <li><a href={`#${image[0]}`}>{image[2]}</a></li>
  {/each}
  <li>
    WebP
    <ul class="secondhier">
      {#each webps as image}
        <li><a href={`#${image[2]}`}>Qualität: {image[1]}</a></li>
      {/each}
    </ul>
  </li>
  <li>
    JPEG
    <ul class="secondhier">
      {#each jpegs as image}
        <li><a href={`#${image[2]}`}>Qualität: {image[1]}</a></li>
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
</style>
