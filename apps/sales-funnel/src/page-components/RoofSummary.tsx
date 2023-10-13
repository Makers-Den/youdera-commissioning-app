import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { useFlowStore } from '@src/store/flow';
import { Button } from 'ui/buttons/Button';

export const RoofSummary = () => {
  const { next, back } = useFlowStore();

  return (
    <LayoutContainer title="Roof Summary">
      <div className="container w-full">
        <div className="flex flex-col gap-7 w-full">
          <div className="h-96 w-full bg-red-400" />
          <div className="containerPadding">
            <div className="md:max-w-container flex flex-col gap-4">
              <Button variant="additional-white">
                Change SELECTED BUILDING
              </Button>
              TODO
            </div>
          </div>
        </div>
        <div className="containerPadding">
          <div className="md:max-w-container buttonContainer">
            <Button variant="main-orange" className="px-10" onClick={next}>
              Next
            </Button>
            <Button variant="additional-white" className="px-10" onClick={back}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};
