import { Site } from '@src/api/youdera/apiTypes';
import { getMinimalSite } from '@src/api/youdera/hooks/sites/apiRequests';
import { GetServerSidePropsContext } from 'next';

export type SiteProps = {
  site: Site;
}

export const fetchSiteFromParams = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context;
  const { projectId } = params || {};

  // Project and Site are the same thing. Users of this app
  // will know the concept as "project" though,
  // while it's a "site" on the backend.
  const siteId = Number(projectId);

  if (!siteId) {
    return {
      notFound: true,
    };
  }

  try {
    const site = await getMinimalSite(siteId);
    const siteProps: SiteProps = {
      site
    };
    return {
      props: siteProps,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
