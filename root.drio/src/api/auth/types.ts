export type LoginFormData = {
  account_name: string;
  username: string;
  password: string;
};

export type LoginRespose = ApiResponse<{ message: string }>;
export type LogoutResponse = ApiResponse<{ message: string }>;
