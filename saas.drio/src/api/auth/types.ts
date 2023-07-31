export type LoginFormData = {
  username: string;
  password: string;
};

export type LoginRespose = ApiResponse<{ message: string }>;
export type LogoutResponse = ApiResponse<{ message: string }>;
