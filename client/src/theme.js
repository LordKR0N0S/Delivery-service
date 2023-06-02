export const colorTokens = {
  grey: {
    0: '#FBFBF9',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },
  primary: {
    50: '#E6FBFF',
    100: '#CCF7FE',
    200: '#99EEFD',
    300: '#FFD700',
    400: '#33DDFB',
    500: '#FFEC12',
    600: '#FFD700',
    700: '#006B7D',
    800: '#00353F',
    900: '#001519',
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[300],
              main: colorTokens.primary[500],
            },
            neutral: {
              dark: colorTokens.grey[10],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[600],
              main: colorTokens.primary[600],
            },
            neutral: {
              dark: colorTokens.grey[800],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[100],
            },
            background: {
              default: colorTokens.grey[50],
              alt: colorTokens.grey[0],
            },
          }),
    },
  };
};
