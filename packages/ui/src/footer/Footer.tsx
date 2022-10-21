import React from 'react'
import { UnderlineLink } from '../links/UnderlineLink'
import { BodyText } from '../typography/Typography'

export const Footer = () => (
	<footer className="w-screen flex items-center justify-between px-10 absolute bottom-4">
		<section className="flex space-x-8">
			<UnderlineLink openNewTab href="google.com">
				Legal Notice
			</UnderlineLink>
			<div className="h-5 w-0 border-r-2 border-gray rounded" />
			<UnderlineLink openNewTab href="google.com">
				Privacy Policy
			</UnderlineLink>
		</section>
		<BodyText>© 2022 Younergy Solar SA. All Rights Reserved.</BodyText>
	</footer>
)