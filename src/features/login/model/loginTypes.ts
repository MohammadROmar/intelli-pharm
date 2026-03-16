export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  roles: string[];
  permissions: string[];
  refresh_token: string;
};

export type LoginParams = {
  email: string;
  password: string;
};
