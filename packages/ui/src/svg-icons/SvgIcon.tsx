import { SVGProps } from 'react';
import { FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { ChevronDown } from './icons/ChevronDown';

export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
  Calendar: FaCalendarAlt,
  Check: FaCheck,
  Cross: FaTimes,
  ChevronDown: ChevronDown,
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function SvgIcon({ name, ...props }: Props) {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}
