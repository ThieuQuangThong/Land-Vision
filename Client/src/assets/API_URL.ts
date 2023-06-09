import { PagingModel } from "src/app/models/paging-model";

export const DOMAIN ='https://localhost:7165';
export const DOMAINCHATBOT = 'http://58.186.76.206:84/docs'

export const API_URL = {
  GET_ALL_POST: (pagingModel: PagingModel) =>`${DOMAIN}/api/Post/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  GET_ALL_APPROVED_POST: (pagingModel: PagingModel) =>`${DOMAIN}/api/Post/getAllApprovedPost/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  GET_ALL_REJECTED_POST: (pagingModel: PagingModel) =>`${DOMAIN}/api/Post/getAllRejectedPost/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  GET_POST_COUNT: () => `${DOMAIN}/api/Post/getPostCount`,
  GET_ALL_POST_BY_TIME: (pagingModel: PagingModel,startDate : string,endDate : string) =>`${DOMAIN}/api/Post/PostByTime/${pagingModel.skipCount}&${pagingModel.maxResultCount}&${startDate}&${endDate}`,
  HIDE_UNHIDE: (postId : number) => `${DOMAIN}/api/Post/hideUnhide/${postId}`,
  GET_ALL_USER: (pagingModel : PagingModel) => `${DOMAIN}/api/Account/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  GET_USER_COUNT : () => `${DOMAIN}/api/Account/getUserCount`,
  FORGOT_PASSWORD: (email: string) => `${DOMAIN}/api/Account/forgotPassword/${email}`,
  REFRESH_TOKEN: () => `${DOMAIN}/api/Account/refresh`,
  VALIDATE_CODE: () => `${DOMAIN}/api/Account/validateCode`,
  CONVERT_FILE_IMAGE_TO_URL: () =>`${DOMAIN}/api/Image/convertFileImageToUrl`,
  CONVERT_BASE64_TO_URL: () =>`${DOMAIN}/api/Image/convertBase64ToUrl`,
  RESET_PASSWORD: () =>`${DOMAIN}/api/Account/resetPassword`,
  LOGIN: () => `${DOMAIN}/api/Account/login`,
  REGISTER_ACCOUNT: () => `${DOMAIN}/api/Account/RegisterAccount`,
  GET_DISTRICT: () =>`${DOMAIN}/api/District`,
  GET_WARD: () => `${DOMAIN}/api/Ward`,
  GET_STREET: () => `${DOMAIN}api/Street`,
  GET_STREET_BY_DISTRICT: (districtId: number) => `${DOMAIN}/api/Street/${districtId}/district`,
  GET_WARD_BY_DISTRICT: (districtId: number) =>`${DOMAIN}/api/Ward/${districtId}/district`,
  GET_DIRECTIONS: () => `${DOMAIN}/api/Property/getDirections`,
  GET_CATEGORYS: () => `${DOMAIN}/api/Category`,
  ADD_POST: (userId: number) =>`${DOMAIN}/api/Post/${userId}`,
  GET_POST_BY_ID: (postId: number, sawNotification: boolean) => `${DOMAIN}/api/Post/getPostDetail/${postId}&${sawNotification}`,
  GET_SEARCHED_POSTS: (pagingModel: PagingModel) => `${DOMAIN}/api/Post/getSearchedPost/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  CHECK_IDENTIFY_CARD: () => `https://api.fpt.ai/vision/idr/vnm`,
  CHECK_IS_USER_AVAILABLE_TO_POST: (userId: number) => `${DOMAIN}/api/Post/availablePost/${userId}`,
  GET_USER_BY_ID: (userId: number) => `${DOMAIN}/api/Account/getUserById/${userId}`,
  GET_ALL_VIP: () => `${DOMAIN}/api/Vip`,
  GET_VIP_BY_ID: (packageId : number) => `${DOMAIN}/api/Vip/${packageId}`,
  ADD_VIP: () => `${DOMAIN}/api/Vip`,
  UPDATE_VIP: (vipId : number) => `${DOMAIN}/api/Vip/${vipId}`,
  DELETE_VIP: (packageId : number)=>`${DOMAIN}/api/Vip/${packageId}`,
  UPDATE_USER_VIP : (userId :number, vipId : number) =>`${DOMAIN}/api/Account/${userId}&${vipId}`,
  GET_INFOR_POSITION_POST: (postId: number) => `${DOMAIN}/api/Post/getAllPositionPost/${postId}`,
  GET_DETAIL_PURCHASE: () => `${DOMAIN}/api/DetailPurchase`,
  ADD_DETAIL_PURCHASE: (userId :number, vipId :number) => `${DOMAIN}/api/DetailPurchase/${userId}&${vipId}`,
  GET_REVENUE: () => `${DOMAIN}/api/DetailPurchase/revenue`,
  GET_POSTS_BY_USER_ID: (userId: number ) => `${DOMAIN}/api/Post/getPost/${userId}/User`,
  UPDATE_POST_BY_ID: (postId: number, userId: number) => `${DOMAIN}/api/Post/${postId}&${userId}`,
  DELETE_POST_ID: (postId: number, userId: number) => `${DOMAIN}/api/Post/${postId}&${userId}`,
  GET_UNAPPROVED_POSTS: (pagingModel: PagingModel) => `${DOMAIN}/api/Post/getUnapprovedPost/${pagingModel.skipCount}&${pagingModel.maxResultCount}`,
  GET_UNAPPROVED_POST_BY_ID: (postId: number) => `${DOMAIN}/api/Post/getPostIsUnApproved/${postId}`,
  APPROVE_POST_BY_ID: (postId: number) => `${DOMAIN}/api/Post/appovePost/${postId}`,
  QR_MOMO: (orderInfor: string, amount: number) => `${DOMAIN}/api/Momo/momoQR/${orderInfor}&${amount}`,
  GET_APPROVED_POST_BY_USER_ID: (userId: number) => `${DOMAIN}/api/Post/getPostIsApproved/${userId}`,
  UPDATE_USER_PATCH_BY_USER_ID: (userId: number) => `${DOMAIN}/api/Account/updateFlexible/${userId}`,
  REJECT_POST_BY_ID: (postId: number) => `${DOMAIN}/api/Post/rejectPost/${postId}`,
  GET_ACCOUNT_BY_TIME : () => `${DOMAIN}/api/Account/countUserByDateTime`,
  GET_POST_BY_TIME : () => `${DOMAIN}/api/Post/countPostByDateTime`,
  GET_REVENUE_BY_TIME : () => `${DOMAIN}/api/DetailPurchase/countRevenueByDateTime`,
  GET_POST_BY_TRANS_TYPE : () => `${DOMAIN}/api/Post/countPostByType`,
  GET_DETAIL_PURCHASE_BY_VIP_TYPE : () => `${DOMAIN}/api/DetailPurchase/countRevenueByVipType`,
  SEND_MESSAGE : () => `${DOMAINCHATBOT}/message`,
  LOGIN_WITH_GOOGLE: () => `${DOMAIN}/api/Account/loginWithGoogle`
};

export const PATCH_PATH = {
  USER:{
    NAME: '/name',
    EMAIL: '/email',
    AVAVAR_LINK: '/avatarLink',
    PHONE: '/phone'
  }
}

