export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  identifier: string;
  password: string;
};
