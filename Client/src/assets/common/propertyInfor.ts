export const PROPERTY_INFOR = {
  Role :{
    admin: 'Admin',
    user: 'User',
    UserAndAdmin: 'Admin,User'
  },
  currentUser: 'currentUser',
  maxResultCount: 12,
  isToView: -1,
  isToUpdate: -2,
  isToApprove: -3,
  isApprove: 0,
  isUnapprove: 1,
  isReject: 2,
  allTransaction: ['AllTransaction'],
  allCategory: 'AllCategory',
  allPrice: ['AnyPrice'],
  allFloor: ['AllFloor'],
  allDirection: ['AllDirection'],
  allBedroom: ['Bedrooms'],
  allBathroom: ['bathrooms'],

  bathRoom: ['1Bathroom','2Bathrooms','3Bathrooms','4Bathrooms','5Bathrooms','MoreBathroom'],
  directions : ['North', 'South', 'East', 'West', 'Northeast', 'Northwest', 'Southeast', 'Southwest'],
  juridicals : ['White', 'Blue', 'Red', 'Pink'],
  floors: ['1Floor','2Floor','3Floor','4Floor','5Floor','MoreFloor'],
  bedRooms:['1BedRoom','2BedRooms','3BedRooms','4BedRooms','5BedRooms','MoreBedRoom'],
  prices: ['500','1000','1500','2000','2500','3000'],
  priceValues: [0, 500000000, 1000000000, 1500000000,2000000000, 2500000000, 3000000000],
  TransactionTypes: ['Sale', 'Rent'],
  Interior: ['True', 'False'],
  VipName: ['','Fortune', 'Wealth','Prosperous'],
  ApproveStatus: ['Approved','Pending','Reject'],

  RejectReasons: ['Content is not suitable', 'Information and location are not the same','Other reason']
};
