<script lang="ts">
  import type { Socket } from "socket.io-client";
  import type { OriginalImage } from "src/utils/types";

  export let originalImage: OriginalImage;
  export let socket: Socket;

  let dragover = false;
  function dragOver() {
    // (e.target as HTMLLabelElement).classList.add('dragover');
    dragover = true;
  }

  function dragleave() {
    //(e.target as HTMLLabelElement).classList.remove('dragover');
    dragover = false;
  }

  function drop(e: DragEvent) {
    if (!e.dataTransfer) throw new Error("Drop Event gescheitert");
    (e.target as HTMLLabelElement).innerText = e.dataTransfer.files[0].name;
    submitFile(e.dataTransfer.files[0]);
  }

  function fsInput(e: Event) {
    const parentElement = (e.target as HTMLInputElement).parentElement;
    if (parentElement) {
      dragover = true;
      parentElement.innerText = (e.target as HTMLInputElement).files?.[0].name ?? "";
    }

    // Ohne umkopieren scheint die strikte Typenprüfung hier nicht zu funktioniren
    const input = e.target as HTMLInputElement;
    if (input.files?.[0]) submitFile(input.files[0]);
    else throw new Error("keine Datei im Inputfeld hinterlegt");
  }

  function submitFile(file: File) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.addEventListener("load", () => {
      const output: OriginalImage = {
        filename: file.name,
        filesize: file.size,
        filetype: file.type,
        binary: reader.result as ArrayBuffer,
      };

      originalImage = output;
      socket.emit("upload", output);
    });
  }
</script>

<form class="dropform">
  <div class="form-group" id="dropzone">
    <label
      class="dropzone"
      class:dragover
      for="filedrop"
      on:dragover|preventDefault={dragOver}
      on:dragleave={dragleave}
      on:drop|preventDefault={drop}
    >
      Grafikdatei auf dieses Feld ziehen oder hier klicken
      <input type="file" id="filedrop" class="form-control-file" on:input={fsInput} />
    </label>
  </div>
</form>

<style>
  .dropzone {
    margin: auto;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    text-align: center;

    outline: #aaa dashed thick;
    outline-offset: -8px;
    border-radius: 1rem;
    padding: 18px;

    background-color: #fffacd;
    background-image: url(../assets/upload.svg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 50%;

    font-weight: bold;
    color: #000532;

    overflow-wrap: anywhere;
  }

  @media (orientation: landscape) {
    .dropzone {
      width: 66vh; /* für die Abwärtskompatibilität */
      width: clamp(200px, 66vh, 600px);
      height: 66vh; /* für die Abwärtskompatibilität */
      height: clamp(200px, 66vh, 600px);

      font-size: 5vh; /* für die Abwärtskompatibilität */
      font-size: clamp(16px, 5vh, 40px);
    }
  }

  @media (orientation: portrait) {
    .dropzone {
      width: 66vw; /* für die Abwärtskompatibilität */
      width: clamp(300px, 66vw, 700px);
      height: 66vw; /* für die Abwärtskompatibilität */
      height: clamp(300px, 66vw, 700px);

      font-size: 5vw; /* für die Abwärtskompatibilität */
      font-size: clamp(16px, 5vw, 40px);
    }
  }

  .dropzone:hover,
  .dropzone.dragover {
    background-color: #ddd;
  }

  .dropzone.dragover {
    outline-color: #fafad2;
  }

  .dropzone input[type="file"] {
    display: none;
  }
</style>
