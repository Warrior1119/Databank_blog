/* --- STATE --- */
export interface LoginState {
  submitting: boolean;
  error?: LoginErrorType | null;
}

export enum LoginErrorType {
  RESPONSE_ERROR = 1,
  INVALID_PASSWORD = 2,
}

export type ContainerState = LoginState;
