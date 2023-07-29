export type FileInfos = {
  filename: string;
  filesize: number;
  quality?: number;
};

export type InputData = [string, { source: string; manifest: FileInfos }];

export type OutputData = FormData;

export interface ErrorMsg {
  message: string;
}

export type Manifest = Record<string, FileInfos>;


export interface OriginalImage {
  filename: string;
  filesize: number;
  filetype: string;
  binary: ArrayBuffer;
};

export interface ResponseImage extends OriginalImage {
      handler: string;
      quality?: number;
}