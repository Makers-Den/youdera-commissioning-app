import { Site } from '@src/api/youdera/apiTypes';
import { getSite } from '@src/api/youdera/hooks/sites/apiRequests';
import { GetServerSidePropsContext } from 'next';

export type SiteProps = {
  project: Site;
}

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
