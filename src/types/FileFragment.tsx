export type FileInfos = {
  filename: string;
  filesize: number;
  quality?: number;
};

export type Manifest = Record<string, FileInfos>;
