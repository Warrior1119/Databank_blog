/* --- STATE --- */
export interface RegisterState {
  submitting: boolean;
  error?: RegisterErrorType | null;
}

export enum RegisterErrorType {
  RESPONSE_ERROR = 1,
  DUPLICATE_EMAIL = 2,
}

export type ContainerState = RegisterState;
