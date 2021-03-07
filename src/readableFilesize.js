export default function readableFilesize(bytes) {
    return Math.round(bytes/1024*100)/100;
}