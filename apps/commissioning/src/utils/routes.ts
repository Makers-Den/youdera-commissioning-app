import { Role } from '@src/api/youdera/apiTypes';

export const routes = {
  electrician: {
    selectTask: '/electrician/select-task',
    selectProject: '/electrician/select-project',
    selectGateway: (siteId: number) =>
      `/electrician/projects/${siteId}/select-gateway`,
    devices: (siteId: number) => `/electrician/projects/${siteId}/devices`,
    verification: (siteId: number) =>
      `/electrician/projects/${siteId}/verification`,
    completed: (siteId: number) => `/electrician/projects/${siteId}/complete`,
  },
  roofer: {
    selectTask: '/roofer/select-task',
    selectProject: '/roofer/select-project',
    selectModuleType: (siteId: number) =>
      `/roofer/projects/${siteId}/select-module-type`,
    moduleFields: (siteId: number) =>
      `/roofer/projects/${siteId}/module-fields`,
    moduleFieldStrings: (siteId: number, roofId: number) =>
      `/roofer/projects/${siteId}/module-fields/${roofId}`,
    stringLayouts: (siteId: number) =>
      `/roofer/projects/${siteId}/string-layouts`,
    complete: (siteId: number) => `/roofer/projects/${siteId}/complete`,
  },
};

export const getAfterLoginRoute = (role: Role) => {
  if (role === Role.electrician || role === Role.admin) {
    return routes.electrician.selectTask;
  }

  if (role === Role.roofer) {
    return routes.roofer.selectTask;
  }

  return '/';
};
