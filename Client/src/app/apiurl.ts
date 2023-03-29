const domain = 'https://localhost:7165/';
export const API_URL = {
  GET_CODE_BY_EMAIL :(email: string) => `${domain}+ api/account/forgotPassword/${email}`,
  LOGIN:() => `${domain} + api/Account/login`,
};

