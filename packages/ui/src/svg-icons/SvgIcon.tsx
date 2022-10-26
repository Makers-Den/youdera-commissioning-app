import { SVGProps } from 'react';
import {
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaEnvelope,
  FaUnlockAlt,
  FaCaretUp,
  FaCaretDown
} from 'react-icons/fa';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronRight } from './icons/ChevronRight';
import { LogOut } from './icons/LogOut';
import { SafetyHelmet } from './icons/SafetyHelmet';
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
  ChevronRight: ChevronRight,
  SafetyHelmet: SafetyHelmet,
  CaretUp: FaCaretUp,
  CaretDown: FaCaretDown
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function SvgIcon({ name, ...props }: Props) {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}
