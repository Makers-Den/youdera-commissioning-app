import { Label } from 'ui/typography/Typography';

export type SelectFallbackProps = {
  label?: string;
};

export function SelectFallback({ label }: SelectFallbackProps) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="mt-1 h-10 animate-pulse bg-gray-100" />
    </div>
  );
}
