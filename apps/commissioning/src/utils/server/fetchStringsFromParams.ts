import { getInverters } from '@src/integrations/youdera/inverters/queries/getInverters';
import { getInverterModels } from '@src/integrations/youdera/models/queries/getInverterModels';
import { getSite } from '@src/integrations/youdera/sites/queries/getSite';
import { getStringsOnRoof } from '@src/integrations/youdera/strings/queries/getStringsOnRoof';
import { GetServerSidePropsContext } from 'next';

export const fetchStringsFromParams = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const { projectId, roofId } = params || {};

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  try {
    const project = await getSite(String(projectId));
    const stringsOnRoof = await getStringsOnRoof(Number(roofId));
    const inverters = await getInverters(Number(projectId));
    const inverterModels = await getInverterModels()
    return {
      props: {
        project,
        stringsOnRoof,
        inverters,
        inverterModels
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};