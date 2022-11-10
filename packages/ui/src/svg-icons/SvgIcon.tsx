import React, { SVGProps } from 'react';
import {
  FaCalendarAlt,
  FaCheck,
  FaEnvelope,
  FaMicrochip,
  FaTable,
  FaTimes,
  FaUnlockAlt
} from 'react-icons/fa';

import { Camera } from './icons/Camera';
import { CaretDown } from './icons/CaretDown';
import { CaretUp } from './icons/CaretUp';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronRight } from './icons/ChevronRight';
import { Commissioning } from './icons/Commissioning';
import { Close } from './icons/Cross';
import { DeviceSwap } from './icons/DeviceSwap';
import { Extention } from './icons/Extension';
import { Gateway } from './icons/Gateway';
import { LogOut } from './icons/LogOut';
import { MagnifyingGlass } from './icons/MagnifyingGlass';
import { Plus } from './icons/Plus';
import { Problem } from './icons/Problem';
import { SafetyHelmet } from './icons/SafetyHelmet';
import { Settings } from './icons/Settings';
import { SolarPanel } from './icons/SolarPanel';
import { Suitcase } from './icons/Suitcase';
import { ThumbsUp } from './icons/ThumbsUp';
import { Trashbin } from './icons/Trashbin';

export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
  Calendar: FaCalendarAlt,
  Check: FaCheck,
  Cross: FaTimes,
  Envelope: FaEnvelope,
  Unlock: FaUnlockAlt,
  Table: FaTable,
  Chip: FaMicrochip,
  ChevronDown,
  Settings,
  LogOut,
  ChevronRight,
  SafetyHelmet,
  CaretUp,
  CaretDown,
  Close,
  ThumbsUp,
  Problem,
  Camera,
  Commissioning,
  DeviceSwap,
  Extention,
  Trashbin,
  Plus,
  Suitcase,
  MagnifyingGlass,
  SolarPanel,
  Gateway
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export const SvgIcon = ({ name, ...props }: Props) => {
  const IconComponent = iconMap[name];
  // eslint-disable-next-line react/react-in-jsx-scope
  return <IconComponent {...props} />;
};
