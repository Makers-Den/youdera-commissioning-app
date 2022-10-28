import { SVGProps } from 'react';
import {
  FaCalendarAlt,
  FaCheck,
  FaEnvelope,
  FaTimes,
  FaUnlockAlt
} from 'react-icons/fa';

import { CaretDown } from './icons/CaretDown';
import { CaretUp } from './icons/CaretUp';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronRight } from './icons/ChevronRight';
import { Commissioning } from './icons/Commissioning'
import { Close } from './icons/Cross';
import { DeviceSwap } from './icons/DeviceSwap';
import { Extention } from './icons/Extension';
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
  ChevronDown,
  Settings,
  LogOut,
  ChevronRight,
  SafetyHelmet,
  CaretUp,
  CaretDown,
  Close,
  Commissioning,
  DeviceSwap,
  Extention,
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export var SvgIcon = ({ name, ...props }: Props) => {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}
