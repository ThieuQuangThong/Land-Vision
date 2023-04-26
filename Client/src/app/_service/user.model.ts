export class User {
  nameid!: number;
  unique_name!: String;
  email!: String;
  role!: string;
  exp!: number;
}

export class UserInfor {
  id: number=0;
  name: string='';
  avatarLink: string ='';
  phone: string='';
  emailExpiresTime : string ='';
  email: string='';
  posted: number = 0;
  vipLevel: number = 0;
  numberOfUserCanPost: number = 0;
  isHide: boolean = false;
}

