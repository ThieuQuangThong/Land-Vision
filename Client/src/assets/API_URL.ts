import { PagingModel } from "src/app/models/paging-model";


export const DOMAIN = "https://localhost:7165";

export const API_URL = {
  GET_ALL_POST: (pagingModel: PagingModel) =>`${DOMAIN}/api/Post/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,

};
