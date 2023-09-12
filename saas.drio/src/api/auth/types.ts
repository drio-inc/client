export type LoginFormData = {
  username: string;
  password: string;
};

export type LogoutResponse = { message: string };
export type LoginRespose = { message: string; token: string };
