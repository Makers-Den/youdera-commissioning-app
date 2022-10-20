import { SVGProps } from 'react';
import { FaCalendarAlt, FaCheck } from 'react-icons/fa';

export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
	Calendar: FaCalendarAlt,
	Check: FaCheck
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function SvgIcon({ name, ...props }: Props) {
	const IconComponent = iconMap[name];
	return <IconComponent {...props} />;
}
