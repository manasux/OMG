import apiEndPoints from '@/utils/apiEndPoints';
import { callApi } from '@/utils/apiUtils';

export const createStaff = (body) =>
  callApi({ uriEndPoint: apiEndPoints.staff.createStaff.v1, body })
    .then((res) => res)
    .catch(() => {});

export const inviteUser = (body) =>
  callApi({ uriEndPoint: apiEndPoints.staff.inviteUser.v1, body })
    .then((res) => res)
    .catch(() => {});

export const getStaffList = ({ query, pathParams }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.getStaffList.v1, query, pathParams })
    .then((res) => res)
    .catch(() => {});

export const getDepartmentStaffList = ({ pathParams }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.getDepartmentStaffList.v1, pathParams })
    .then((res) => res)
    .catch(() => {});

export const addStaff = ({ body }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.addStaff.v1, body })
    .then((res) => res)
    .catch(() => {});

export const disableStaff = ({ pathParams }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.disableStaff.v1, pathParams })
    .then((res) => res)
    .catch(() => {});

export const enableStaff = ({ pathParams, body }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.enableStaff.v1, pathParams, body });

export const getStaffDetails = (pathParams) =>
  callApi({ uriEndPoint: apiEndPoints.staff.getStaffDetails.v1, pathParams })
    .then((res) => res)
    .catch(() => {});

export const staffClassAssociation = ({ body, staffId }) => {
  return callApi({
    uriEndPoint: apiEndPoints.staff.addClassToStaff.v1,
    body,
    pathParams: { staffId },
  })
    .then((res) => res)
    .catch(() => {});
};
export const deleteStaffClassAssociation = ({ body, staffId }) => {
  return callApi({
    uriEndPoint: apiEndPoints.staff.deleteClassOfStaff.v1,
    body,
    pathParams: { staffId },
  })
    .then((res) => res)
    .catch(() => {});
};

export const updateStaffDetails = ({ body, staffId }) => {
  return callApi({
    uriEndPoint: apiEndPoints.staff.updateStaffDetails.v1,
    body,
    pathParams: { staffId },
  })
    .then((res) => res)
    .catch(() => {});
};
export const getDepartmentList = ({ query, pathParams }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.getDepartmentList.v1, query, pathParams });

export const getOrgMemberList = ({ query, pathParams }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.getOrgMemberList.v1, query, pathParams });

export const createDepartment = ({ body }) =>
  callApi({ uriEndPoint: apiEndPoints.staff.createDepartment.v1, body });
