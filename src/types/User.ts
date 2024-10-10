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