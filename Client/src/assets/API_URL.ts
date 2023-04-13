import { PagingModel } from "src/app/models/paging-model";

export const DOMAIN = "https://localhost:44310";

export const API_URL = {
  GET_ALL_POST: (pagingModel: PagingModel) =>`${DOMAIN}/api/Post/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  GET_ALL_POST_BY_TIME: (pagingModel: PagingModel,startDate : string,endDate : string) =>`${DOMAIN}/api/Post/PostByTime/${pagingModel.skipCount}&${pagingModel.maxResultCount}&${startDate}&${endDate}`,
  FORGOT_PASSWORD: (email: string) => `${DOMAIN}/api/Account/forgotPassword/${email}`,
  REFRESH_TOKEN: () => `${DOMAIN}/api/Token/Refresh`,
  VALIDATE_CODE:() => `${DOMAIN}/api/Account/validateCode`,
  CONVERT_FILE_IMAGE_TO_URL:() =>`${DOMAIN}/api/Image/convertFileImageToUrl`,
  RESET_PASSWORD:() =>`${DOMAIN}/api/Account/resetPassword`,
  LOGIN:() => `${DOMAIN}/api/Account/login`,
  REGISTER_ACCOUNT:() => `${DOMAIN}/api/Account/RegisterAccount`,
  GET_DISTRICT:() =>`${DOMAIN}/api/District`,
  GET_WARD:() => `${DOMAIN}/api/Ward`,
  GET_STREET:() => `${DOMAIN}api/Street`,
  GET_STREET_BY_DISTRICT:(districtId: number) => `${DOMAIN}/api/Street/${districtId}/district`,
  GET_WARD_BY_DISTRICT:(districtId: number) =>`${DOMAIN}/api/Ward/${districtId}/district`,
  GET_DIRECTIONS:() => `${DOMAIN}/api/Property/getDirections`
};
