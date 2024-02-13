export type LoginFormData = {
  account: string;
  username: string;
  password: string;
};

export type LogoutResponse = { message: string };
export type LoginResponse = {
  token: string;
  message: string;
  account_id: string;
};
