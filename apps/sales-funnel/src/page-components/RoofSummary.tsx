import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { useFlowStore } from '@src/store/flow';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';

export const RoofSummary = () => {
  const intl = useIntl();
  const { next, back } = useFlowStore();

  return (
    <LayoutContainer title="Roof Summary">
      <div className="container w-full">
        <div className="flex w-full flex-col gap-7">
          <div className="h-96 w-full bg-red-400" />
          <div className="containerPadding">
            <div className="md:max-w-container flex flex-col gap-4">
              <Button variant="additional-white">
                {intl.formatMessage({
                  defaultMessage: 'Change SELECTED BUILDING',
                })}
              </Button>
              TODO
            </div>
          </div>
        </div>
        <div className="containerPadding">
          <div className="md:max-w-container buttonContainer">
            <Button variant="main-orange" className="px-10" onClick={next}>
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
            <Button variant="additional-white" className="px-10" onClick={back}>
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};
