import { useToast } from "ui/toast/Toast";


/** 
 * Convenience function so we can centralize our @ts-ignores to one single location 
 * @params err An error (unknown) with a message property
 */
export function toMessage(err: unknown) {
  // @ts-ignore
  return err.message;
}

/**
 * Reports an error
 * 
 * @param toast 
 * @param err 
 */
export function reportApiError(toast: ReturnType<typeof useToast>, err: unknown) {
  toast.error(toMessage(err));
  // eslint-disable-next-line no-console
  console.error(err);
}
