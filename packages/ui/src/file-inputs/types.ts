export enum UploadStatus {
  idle = 'idle',
  uploading = 'uploading',
  success = 'success',
  error = 'error',
}

export type UploadedFile = {
  url: string;
  name: string;
  type: string;
};
