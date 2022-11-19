import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { UnderlineLink } from 'ui/links/UnderlineLink';
import { BodyText, H1 } from 'ui/typography/Typography';

export default function FourOhFour() {
  const intl = useIntl();

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Box>
        <BoxHeader>
          <BoxTitle title={intl.formatMessage({ defaultMessage: '404 - Page not found' })}/>
        </BoxHeader>
        <BoxContent>
          <BodyText className="mb-3">{intl.formatMessage({ defaultMessage: 'You may not have access to a requested resource, or it doesn\'t exist' })}</BodyText>
          <UnderlineLink className='mb-3' href="/">
            {intl.formatMessage({ defaultMessage: 'Go back home' })}
          </UnderlineLink>
        </BoxContent>
      </Box>
    </div>
  );
}