export type LoginResponse = {
  name: string;
  email: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  roles: string[];
  permissions: string[];
};

export type LoginParams = {
  email: string;
  password: string;
};
