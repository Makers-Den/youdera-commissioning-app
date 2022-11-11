import { FormEvent, useCallback, useReducer } from 'react';

import { FileUploaderProps } from './FileUploader';
import { UploadedFile, UploadStatus } from './types';

type State =
  | {
      status: UploadStatus.idle;
      uploadedFilesUrls: UploadedFile[];
    }
  | {
      status: UploadStatus.uploading;
      uploadedFilesUrls: UploadedFile[];
      uploadProgressPercentage: number;
    }
  | {
      status: UploadStatus.success;
      uploadedFilesUrls: UploadedFile[];
    }
  | {
      status: UploadStatus.error;
      uploadedFilesUrls: UploadedFile[];
      errorMessage: string;
    };

enum ActionType {
  setUploadPercentage = 'setUploadPercentage',
  addNewFileUrl = 'addNewFileUrl',
  setErrorMessage = 'setErrorMessage',
  removeFile = 'removeFile',
}

type Action =
  | {
      type: ActionType.setUploadPercentage;
      payload: number;
    }
  | {
      type: ActionType.addNewFileUrl;
      payload: UploadedFile;
    }
  | {
      type: ActionType.setErrorMessage;
      payload: string;
    }
  | {
      type: ActionType.removeFile;
      payload: UploadedFile;
    };

const reducer = (state: State, { type, payload }: Action): State => {
  const uploadedFile = payload as UploadedFile;

  switch (type) {
    case ActionType.setUploadPercentage:
      return {
        ...state,
        status: UploadStatus.uploading,
        uploadProgressPercentage: payload as number,
      };
    case ActionType.addNewFileUrl:
      return {
        uploadedFilesUrls: [...state.uploadedFilesUrls, uploadedFile],
        status: UploadStatus.success,
      };
    case ActionType.setErrorMessage:
      return {
        ...state,
        status: UploadStatus.error,
        errorMessage: payload as string,
      };
    case ActionType.removeFile:
      return {
        ...state,
        uploadedFilesUrls: state.uploadedFilesUrls.filter(
          ({ url, name, type: fileType }) =>
            !(
              url === uploadedFile.url &&
              name === uploadedFile.name &&
              fileType === uploadedFile.type
            ),
        ),
      };
    default:
      return state;
  }
};

export type UseFileUploaderArgs = {
  uploadFile: (
    event: FormEvent<HTMLInputElement>,
    setUploadPercentageProgress: (percentage: number) => void,
    setUploadedFileUrl: (url: string) => void,
    setErrorMessage: (message: string) => void,
  ) => unknown;
  initialState?: UploadedFile[];
};

type ReturnType = {
  fileUploaderProps: Pick<
    FileUploaderProps,
    'status' | 'errorMessage' | 'onChange' | 'uploadProgressPercentage'
  >;
  uploadedFilesUrls: UploadedFile[];
  removeFile: (file: UploadedFile) => void;
};

export const useFileUploader = ({
  uploadFile,
  initialState,
}: UseFileUploaderArgs): ReturnType => {
  const [state, dispatch] = useReducer(reducer, {
    status: UploadStatus.idle,
    uploadedFilesUrls: initialState || [],
  });

  const addUploadedUrl = useCallback(
    (name: string, type: string, url: string) => {
      dispatch({
        type: ActionType.addNewFileUrl,
        payload: { url, type, name },
      });
    },
    [],
  );

  const setErrorMessage = useCallback((message: string) => {
    dispatch({ type: ActionType.setErrorMessage, payload: message });
  }, []);

  const setUploadProgressPercentage = useCallback((percentage: number) => {
    dispatch({ type: ActionType.setUploadPercentage, payload: percentage });
  }, []);

  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      uploadFile(
        event,
        setUploadProgressPercentage,
        addUploadedUrl.bind(null, file?.name || '', file?.type || ''),
        setErrorMessage,
      );
    },
    [uploadFile, addUploadedUrl, setUploadProgressPercentage, setErrorMessage],
  );

  const removeFile = useCallback((file: UploadedFile) => {
    dispatch({ type: ActionType.removeFile, payload: file });
  }, []);

  const { uploadedFilesUrls, ...restState } = state;

  return {
    fileUploaderProps: { onChange, ...restState },
    uploadedFilesUrls,
    removeFile,
  };
};
