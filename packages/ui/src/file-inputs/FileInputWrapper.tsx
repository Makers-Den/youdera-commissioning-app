/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ReactNode, useId, useRef } from 'react';

export type FileInputWrapperProps = {
  className?: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
  children: ReactNode;
  name?: string;
  multiple?: boolean;
  accept?: string;
  capture?: boolean | 'user' | 'environment';
  disabled?: boolean;
};

export function FileInputWrapper({
  children,
  className,
  ...inputProps
}: FileInputWrapperProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const id = useId();

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <label htmlFor={id} onClick={handleClick} className={className}>
      <input ref={hiddenFileInput} type="file" id={id} hidden {...inputProps} />
      {children}
    </label>
  );
}
