export enum ApiFileType {
  stringLayout = 'string layout',
  additionalPictures = 'additional pictures',
}

export interface ApiFile {
  id: string;
  name: string;
  type: ApiFileType;
  size: number;
  visible_for_customer: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface AddFileToSiteRequest {
  siteId: string;
  file: File;
  type: ApiFileType;
}

export interface DeleteFileFromSiteRequest {
  siteId: string;
  documentId: string;
}
