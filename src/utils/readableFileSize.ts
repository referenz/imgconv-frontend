export default function readableFileSize(bytes: number): number {
  return Math.round((bytes / 1024) * 100) / 100;
}
