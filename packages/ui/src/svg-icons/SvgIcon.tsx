import { SVGProps } from 'react';
import { FaCalendarAlt, FaCheck, FaTimes, FaEnvelope, FaUnlockAlt } from 'react-icons/fa';
import { ChevronDown } from './icons/ChevronDown';
import { LogOut } from './icons/LogOut';
import { Settings } from './icons/Settings';

export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
  Calendar: FaCalendarAlt,
  Check: FaCheck,
  Cross: FaTimes,
  Envelope: FaEnvelope,
  Unlock: FaUnlockAlt,
  ChevronDown: ChevronDown,
  Settings: Settings,
  LogOut: LogOut,
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function SvgIcon({ name, ...props }: Props) {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}
