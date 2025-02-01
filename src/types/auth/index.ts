export type Jwt = {
  access_token: string;
};

export type LoginForm = {
  username: string;
  password: string;
}

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
}