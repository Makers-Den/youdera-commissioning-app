import React from 'react'
import { UnderlineLink } from '../links/UnderlineLink'
import { BodyText } from '../typography/Typography'

export type PrimaryFooterProps = {
	links?: {
		href: string,
		name: string
	}[]
};

export const Footer: React.FC<PrimaryFooterProps> = ({ links }) => (
	<footer className="w-screen flex items-center justify-between px-10 mt-auto mb-3">
		<section className="flex space-x-8">
			{links?.map((link, idx) => (
				<div key={idx} className='flex space-x-8'>
					<UnderlineLink openNewTab href={link.href} >
						{link.name}
					</UnderlineLink>
					{idx !== links.length - 1 && <div className="h-5 w-0 border-r-2 border-gray-300 rounded" />}
				</div>
			))}


		</section>
		<BodyText>© 2022 Younergy Solar SA. All Rights Reserved.</BodyText>
	</footer>
)