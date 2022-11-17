import React, { KeyboardEvent,RefObject, useEffect, useRef, useState } from "react";
import { Input, InputProps } from "ui/inputs/Input"

type IpAddressInputProps = {
  value?: string;
  /** Value passed to onChange is not guaranteed to be valid and needs to validated */
  onChange?: (value?: string) => void;
}

type IpAddress = [string, string, string, string];

const nullIp = ["", "", "", ""] as IpAddress;

const Dot = () => <span className="text-2xl text-green-400">.</span>

function toIpAddress(str?: string) {
  const ipArr = str?.split(".");

  if (ipArr?.length === 4) {
    return ipArr as IpAddress;
  }

  return nullIp;
}

const IpPartInput = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => 
  <Input
    maxLength={3}
    placeholder="0"
    ref={ref}
    {...props}
  />
);

export const IpAddressInput = ({ value, onChange }: IpAddressInputProps) => {
  const [p1, setP1] = useState<string>(toIpAddress(value)[0]);
  const [p2, setP2] = useState<string>(toIpAddress(value)[1]);
  const [p3, setP3] = useState<string>(toIpAddress(value)[2]);
  const [p4, setP4] = useState<string>(toIpAddress(value)[3]);

  // Change stemming from external source (value prop)
  useEffect(() => {
    const [one, two, three, four] = toIpAddress(value);
    setP1(one);
    setP2(two);
    setP3(three);
    setP4(four);
  }, [value]);

  const changeRef = useRef<(val: string) => void>();
  changeRef.current = onChange;

  // Change stemming from internal source (user input)
  useEffect(() => {
    changeRef.current?.(`${p1}.${p2}.${p3}.${p4}`)
  }, [p1, p2, p3, p4]);

  const input2ref = useRef<HTMLInputElement>(null);
  const input3ref = useRef<HTMLInputElement>(null);
  const input4ref = useRef<HTMLInputElement>(null);

  const buildKeyUpHandler = (inputRef: RefObject<HTMLInputElement>) => 
    (e: KeyboardEvent<HTMLInputElement>) => {
      if ((e.target as HTMLInputElement).value.length === 3) {
        inputRef.current?.focus();
      }
  };

  return (
    <div className="flex items-end gap-2">
      <IpPartInput
        value={p1}
        onChange={(e) => setP1(e.target.value)}
        onKeyUp={buildKeyUpHandler(input2ref)}
      />
      <Dot />
      <IpPartInput
        value={p2}
        onChange={(e) => setP2(e.target.value)}
        ref={input2ref}
        onKeyUp={buildKeyUpHandler(input3ref)}
      />
      <Dot />
      <IpPartInput
        value={p3}
        onChange={(e) => setP3(e.target.value)}
        ref={input3ref}
        onKeyUp={buildKeyUpHandler(input4ref)}
      />
      <Dot />
      <IpPartInput
        value={p4}
        onChange={(e) => setP4(e.target.value)}
        ref={input4ref}
      />
    </div>
  )
}