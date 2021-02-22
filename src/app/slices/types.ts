import { Auth } from 'types/Auth';

/* --- STATE --- */
export interface AuthState {
  loggedIn: boolean;
  auth: Auth | null;
}

export type ContainerState = AuthState;
