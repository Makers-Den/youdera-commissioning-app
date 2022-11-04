import { getSite } from '@src/integrations/youdera/sites/queries/getSite';
import { GetServerSidePropsContext } from 'next';

export const fetchProjectFromParams = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context;
  const { projectId } = params || {};

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  try {
    const project = await getSite(String(projectId));
    return {
      props: {
        project,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
