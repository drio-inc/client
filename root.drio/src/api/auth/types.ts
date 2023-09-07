export type LoginFormData = {
  account: string;
  username: string;
  password: string;
};

export type LogoutResponse = { message: string };
export type LoginRespose = { message: string; token: string };
