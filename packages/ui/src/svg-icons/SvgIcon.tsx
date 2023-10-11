import React, { SVGProps } from 'react';
import {
  FaCalendarAlt,
  FaCheck,
  FaDownload,
  FaEnvelope,
  FaGlobe,
  FaIndustry,
  FaLightbulb,
  FaMicrochip,
  FaPhone,
  FaPlug,
  FaTable,
  FaTimes,
  FaUnlockAlt,
} from 'react-icons/fa';

import { Battery } from './icons/Battery';
import { BatteryAlt } from './icons/BatteryAlt';
import { BatteryRect } from './icons/BatteryRect';
import { Camera } from './icons/Camera';
import { CaretDown } from './icons/CaretDown';
import { CaretUp } from './icons/CaretUp';
import { ChevronDown } from './icons/ChevronDown';
import { ChevronRight } from './icons/ChevronRight';
import { Commissioning } from './icons/Commissioning';
import { Coverage } from './icons/Coverage';
import { Close } from './icons/Cross';
import { DeviceSwap } from './icons/DeviceSwap';
import { Extention } from './icons/Extension';
import { Gateway } from './icons/Gateway';
import { Info } from './icons/Info';
import { Inverter } from './icons/Inverter';
import { InverterRect } from './icons/InverterRect';
import { Leaf } from './icons/Leaf';
import { Lightning } from './icons/Lightning';
import { LogOut } from './icons/LogOut';
import { MagnifyingGlass } from './icons/MagnifyingGlass';
import { Meter } from './icons/Meter';
import { MeterAlt } from './icons/MeterAlt';
import { MeterRect } from './icons/MeterRect';
import { Plus } from './icons/Plus';
import { Problem } from './icons/Problem';
import { SafetyHelmet } from './icons/SafetyHelmet';
import { Savings } from './icons/Savings';
import { Settings } from './icons/Settings';
import { SolarPanel } from './icons/SolarPanel';
import { SolarPanelAlt } from './icons/SolarPanelAlt';
import { StatusError } from './icons/StatusError';
import { StatusOk } from './icons/StatusOk';
import { StatusPending } from './icons/StatusPending';
import { Suitcase } from './icons/Suitcase';
import { ThumbsUp } from './icons/ThumbsUp';
import { Trashbin } from './icons/Trashbin';
import { Wrench } from './icons/Wrench';

export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
  Calendar: FaCalendarAlt,
  Check: FaCheck,
  Cross: FaTimes,
  Envelope: FaEnvelope,
  Unlock: FaUnlockAlt,
  Table: FaTable,
  Chip: FaMicrochip,
  Meter,
  Battery,
  Inverter,
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
  Gateway,
  StatusOk,
  StatusError,
  StatusPending,
  InverterRect,
  BatteryRect,
  MeterRect,
  Phone: FaPhone,
  Industry: FaIndustry,
  Download: FaDownload,
  Plug: FaPlug,
  Lightbulb: FaLightbulb,
  Globe: FaGlobe,
  Wrench,
  BatteryAlt,
  SolarPanelAlt,
  Info,
  Lightning,
  MeterAlt,
  Coverage,
  Leaf,
  Savings,
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export const SvgIcon = ({ name, ...props }: Props) => {
  const IconComponent = iconMap[name];
  // eslint-disable-next-line react/react-in-jsx-scope
  return <IconComponent {...props} />;
};
