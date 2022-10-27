import React, { SVGProps } from 'react';
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
import { Close } from './icons/Cross';
import { LogOut } from './icons/LogOut';
import { SafetyHelmet } from './icons/SafetyHelmet';
import { Settings } from './icons/Settings';
import { ThumbsUp } from './icons/ThumbsUp';

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
  ThumbsUp
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export const SvgIcon = ({ name, ...props }: Props) => {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}
