import React from 'react'
import { Footer, PrimaryFooterProps } from '../footer/Footer'
import { FooterButtons, ButtonsFooterProps } from '../footer/FooterButtons'

type LayoutProps = {
	footerType?: 'primary' | 'buttons',
	children: JSX.Element,
} & PrimaryFooterProps & ButtonsFooterProps

export const Layout: React.FC<LayoutProps> = ({ children, footerType, buttons, links }) => {
	return (
		<div className='min-h-screen w-screen flex flex-col items-center justify-center'>
			{children}
			{footerType === 'buttons'
				? <FooterButtons buttons={buttons}></FooterButtons>
				: <Footer links={links} />
			}
		</div>
	)
}
