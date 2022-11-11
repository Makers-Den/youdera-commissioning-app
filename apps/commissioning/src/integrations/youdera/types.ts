export type CreateDataResponse<T> = {
  data: T;
};

export type UpdateDataResponse<T> = {
  data: T;
}

export type CommunicationStatus = 'pending' | 'failed' | 'success';
