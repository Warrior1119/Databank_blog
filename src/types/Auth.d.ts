export interface Auth {
  token: string;
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ProfileForm {
  name: string;
  email: string;
  password: string;
  avatar: string;
}