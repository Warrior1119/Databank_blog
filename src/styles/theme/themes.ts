const defaultTheme = {
  primary: 'rgba(215,113,88,1)',
  text: 'rgba(58,52,51,1)',
  textSecondary: 'rgba(58,52,51,0.7)',
  textError: 'rgba(255, 0, 0, 1)',
  textSuccess: 'rgba(55, 160, 55, 1)',
  background: 'rgba(255,255,255,1)',
  backgroundVariant: 'rgba(251,249,249,1)',
  backgroundError: 'rgba(255, 0, 0, 0.1)',
  backgroundSuccess: 'rgba(0, 255, 0, 0.1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
};

export type Theme = typeof defaultTheme;

export const themes = {
  default: defaultTheme,
};
