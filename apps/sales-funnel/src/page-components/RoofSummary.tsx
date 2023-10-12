import { Container } from '@src/components/container/Container';
import { useFlowStore } from '@src/store/flow';
import { Button } from 'ui/buttons/Button';

export const RoofSummary = () => {
  const { next, back } = useFlowStore();

  return (
    <Container title="Roof Summary" className="p-0 md:px-0 md:py-0 lg:px-0">
      <div className="flex flex-col gap-7">
        <div className="h-96 w-full bg-red-400" />
        <div className="flex flex-col gap-5 p-5 md:px-12 md:py-7 lg:px-24">
          <Button variant="additional-white">Change SELECTED BUILDING</Button>
          TODO
        </div>
      </div>
      <div className="z-10 flex flex-col justify-between gap-4 p-5 md:flex-row-reverse md:px-12 md:py-7 lg:px-24">
        <Button variant="main-orange" className="px-10" onClick={next}>
          Next
        </Button>
        <Button variant="additional-white" className="px-10" onClick={back}>
          Back
        </Button>
      </div>
    </Container>
  );
};
