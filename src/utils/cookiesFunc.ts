import Cookies from 'js-cookie';

export type Token = {
  token: string;
  name: string;
  role: string;
  expiresIn:string;
};

export const saveToken = (token: string) => {
  Cookies.set('token', JSON.stringify(token));
};

export const getToken = () => {
  const tokenObj = Cookies.get('token');
  let token;
  if (tokenObj) {
    token = JSON.parse(tokenObj);
  }
  return token ? token : null;
};

export const removeToken = () => {
  Cookies.remove('token');
};
