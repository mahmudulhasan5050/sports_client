export type User = {
    _id?: string
    name: string;
    email: string;
    password?: string;
    role?: 'admin' | 'member' | 'non-member';
    isPaid?: boolean;
    isValid?: boolean;

  }

  export type SignInType = {
    email: string;
    password: string;
  }

  export type DecodedToken = {
    sub: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
  }

  // export type UserInfoFromToken = {
  //   name: string;
  //   role: string;
  // }