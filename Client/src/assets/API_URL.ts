import { PagingModel } from "src/app/models/paging-model";


export const DOMAIN = "https://localhost:7165";

export const API_URL = {
  GET_ALL_POST: (pagingModel: PagingModel) =>`${DOMAIN}/api/Post/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  FORGOT_PASSWORD: (email: string) => `${DOMAIN}/api/Account/forgotPassword/${email}`,
  REFRESH_TOKEN: () => `${DOMAIN}/api/Token/Refresh`,
  VALIDATE_CODE:() => `${DOMAIN}/api/Account/validateCode`,
  CONVERT_FILE_IMAGE_TO_URL:() =>`${DOMAIN}/api/Image/convertFileImageToUrl`,
};
