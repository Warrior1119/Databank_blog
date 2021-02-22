/* --- STATE --- */
export interface ProfileState {
  submitting: boolean;
  success: boolean;
  error?: ProfileErrorType | null;
}

export enum ProfileErrorType {
  RESPONSE_ERROR = 1,
  DUPLICATE_EMAIL = 2,
}

export type ContainerState = ProfileErrorType;
