import { SVGProps } from 'react';
import {
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaEnvelope,
  FaUnlockAlt
} from 'react-icons/fa';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronRight } from './icons/ChevronRight';
import { Close } from './icons/Cross';
import { LogOut } from './icons/LogOut';
import { SafetyHelmet } from './icons/SafetyHelmet';
import { Settings } from './icons/Settings';
import { CaretUp } from './icons/CaretUp';
import { CaretDown } from './icons/CaretDown';

export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
  Calendar: FaCalendarAlt,
  Check: FaCheck,
  Cross: FaTimes,
  Envelope: FaEnvelope,
  Unlock: FaUnlockAlt,
  ChevronDown,
  Settings,
  LogOut,
  ChevronRight,
  SafetyHelmet,
  CaretUp,
  CaretDown,
  Close,
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function SvgIcon({ name, ...props }: Props) {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}
