import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'
import { DecodedToken } from '../types/User';

export type Token = {
  token: string;
  name: string;
  role: string;
  expiresIn:string;
};


export const saveToken = async(token: string) => {
  await Cookies.set('token', JSON.stringify(token));
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

export const tokenDecodeFunc = (token: string) =>{
const tokenString = token.split(" ")[1]
const user = jwtDecode<DecodedToken>(tokenString)
return {name: user.name, role: user.role}
}
