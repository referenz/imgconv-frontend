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